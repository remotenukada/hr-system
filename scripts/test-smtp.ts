import { testSmtpConnection } from "../lib/mail";

async function main() {
  try {
    await testSmtpConnection();
    console.log("SMTP接続成功");
  } catch (error) {
    console.error("SMTP接続失敗");

    if (error instanceof Error) {
      console.error(error.message);
      console.error(error);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  }
}

main();
