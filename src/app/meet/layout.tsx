import Script from 'next/script';

export default function MeetLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Script src="https://www.gstatic.com/meet/addon/sdk.js" />
      {children}
    </>
  );
}
