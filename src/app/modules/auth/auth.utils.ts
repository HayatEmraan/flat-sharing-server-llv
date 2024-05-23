function generateSixDigitCode() {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const sixDigitCode = String(randomNumber).padStart(6, "0");
  return sixDigitCode;
}


export default generateSixDigitCode
