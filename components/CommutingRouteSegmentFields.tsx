"use client";

import { useEffect, useMemo, useState } from "react";

type Segment = {
  id: string;
  operatorName: string;
  lineName: string;
  boardingPoint: string;
  alightingPoint: string;
  oneWayFare: string;
  monthlyPassAmount: string;
  fareSystem: string;
};

function createSegment(): Segment {
  return {
    id: crypto.randomUUID(),
    operatorName: "",
    lineName: "",
    boardingPoint: "",
    alightingPoint: "",
    oneWayFare: "",
    monthlyPassAmount: "",
    fareSystem: "STANDARD",
  };
}

export default function CommutingRouteSegmentFields() {
  const [segments, setSegments] = useState<Segment[]>([
    createSegment(),
  ]);

  const [commutingType, setCommutingType] =
    useState("PUBLIC_TRANSPORT");

  useEffect(() => {
    const select = document.querySelector<HTMLSelectElement>(
      'select[name="commutingType"]',
    );

    if (!select) return;

    const updateCommutingType = () => {
      setCommutingType(select.value);
    };

    updateCommutingType();

    select.addEventListener("change", updateCommutingType);

    return () => {
      select.removeEventListener(
        "change",
        updateCommutingType,
      );
    };
  }, []);

  const calculated = useMemo(() => {
    const keikyuIndexes = segments
      .map((segment, index) => ({
        index,
        amount: Number(segment.monthlyPassAmount) || 0,
        isKeikyu:
          segment.fareSystem === "KEIKYU_AMOUNT_IC",
      }))
      .filter((item) => item.isKeikyu);

    const maxKeikyuIndex =
      keikyuIndexes.sort((a, b) => b.amount - a.amount)[0]
        ?.index ?? -1;

    return segments.map((segment, index) => {
      const oneWayFare = Number(segment.oneWayFare) || 0;
      const monthlyPassAmount =
        Number(segment.monthlyPassAmount) || 0;

      const payableAmount =
        segment.fareSystem === "KEIKYU_AMOUNT_IC"
          ? index === maxKeikyuIndex
            ? monthlyPassAmount
            : 0
          : monthlyPassAmount;

      return {
        roundTripFare: oneWayFare * 2,
        payableAmount,
      };
    });
  }, [segments]);

  const total = calculated.reduce(
    (sum, item) => sum + item.payableAmount,
    0,
  );

  function update(
    index: number,
    field: keyof Segment,
    value: string,
  ) {
    setSegments((current) =>
      current.map((segment, itemIndex) =>
        itemIndex === index
          ? { ...segment, [field]: value }
          : segment,
      ),
    );
  }

  function addSegment() {
    setSegments((current) => [
      ...current,
      createSegment(),
    ]);
  }

  function removeSegment(index: number) {
    setSegments((current) =>
      current.length === 1
        ? current
        : current.filter(
            (_, itemIndex) => itemIndex !== index,
          ),
    );
  }

  if (commutingType !== "PUBLIC_TRANSPORT") {
    return null;
  }

  return (
    <section className="rounded border bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">
            公共交通機関別明細
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            小田急、JR、京急バスなど、交通機関ごとに入力します。
          </p>
        </div>

        <button
          type="button"
          onClick={addSegment}
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white"
        >
          明細を追加
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {segments.map((segment, index) => (
          <div
            key={segment.id}
            className="rounded border bg-white p-4"
          >
            <div className="mb-3 flex justify-between">
              <h3 className="font-medium">
                明細 {index + 1}
              </h3>

              <button
                type="button"
                onClick={() => removeSegment(index)}
                disabled={segments.length === 1}
                className="text-sm text-red-600 disabled:text-gray-300"
              >
                削除
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="text-sm">交通事業者</span>
                <input
                  name="segmentOperatorName"
                  required
                  value={segment.operatorName}
                  onChange={(event) =>
                    update(
                      index,
                      "operatorName",
                      event.target.value,
                    )
                  }
                  placeholder="例：小田急電鉄、JR東日本、京急バス"
                  className="mt-1 w-full rounded border p-2"
                />
              </label>

              <label>
                <span className="text-sm">路線名</span>
                <input
                  name="segmentLineName"
                  value={segment.lineName}
                  onChange={(event) =>
                    update(
                      index,
                      "lineName",
                      event.target.value,
                    )
                  }
                  placeholder="例：小田原線、東海道線"
                  className="mt-1 w-full rounded border p-2"
                />
              </label>

              <label>
                <span className="text-sm">乗車地</span>
                <input
                  name="segmentBoardingPoint"
                  value={segment.boardingPoint}
                  onChange={(event) =>
                    update(
                      index,
                      "boardingPoint",
                      event.target.value,
                    )
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </label>

              <label>
                <span className="text-sm">降車地</span>
                <input
                  name="segmentAlightingPoint"
                  value={segment.alightingPoint}
                  onChange={(event) =>
                    update(
                      index,
                      "alightingPoint",
                      event.target.value,
                    )
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </label>

              <label>
                <span className="text-sm">片道運賃</span>
                <input
                  type="number"
                  min="0"
                  name="segmentOneWayFare"
                  value={segment.oneWayFare}
                  onChange={(event) =>
                    update(
                      index,
                      "oneWayFare",
                      event.target.value,
                    )
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </label>

              <label>
                <span className="text-sm">
                  1か月定期代
                </span>
                <input
                  type="number"
                  min="0"
                  name="segmentMonthlyPassAmount"
                  value={segment.monthlyPassAmount}
                  onChange={(event) =>
                    update(
                      index,
                      "monthlyPassAmount",
                      event.target.value,
                    )
                  }
                  className="mt-1 w-full rounded border p-2"
                />
              </label>

              <label>
                <span className="text-sm">定期制度</span>
                <select
                  name="segmentFareSystem"
                  value={segment.fareSystem}
                  onChange={(event) =>
                    update(
                      index,
                      "fareSystem",
                      event.target.value,
                    )
                  }
                  className="mt-1 w-full rounded border p-2"
                >
                  <option value="STANDARD">
                    通常定期
                  </option>
                  <option value="KEIKYU_AMOUNT_IC">
                    京急バス金額式IC定期
                  </option>
                </select>
              </label>

              <div className="rounded bg-gray-50 p-3 text-sm">
                <div>
                  往復運賃：
                  {calculated[
                    index
                  ].roundTripFare.toLocaleString()}
                  円
                </div>
                <div>
                  支給対象額：
                  {calculated[
                    index
                  ].payableAmount.toLocaleString()}
                  円
                </div>
              </div>
            </div>

            <input
              type="hidden"
              name="segmentRoundTripFare"
              value={calculated[index].roundTripFare}
            />
            <input
              type="hidden"
              name="segmentPayableAmount"
              value={calculated[index].payableAmount}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4 font-semibold text-blue-900">
        定期代合計：{total.toLocaleString()}円
      </div>
    </section>
  );
}
