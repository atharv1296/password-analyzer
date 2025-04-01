import PasswordAnalyzer from "@/components/PasswordAnalyzer";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Password Strength Analyzer</title>
        <meta name="description" content="Check how secure your password is with real-time analysis" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      <PasswordAnalyzer />
    </>
  );
}
