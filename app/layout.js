export const metadata = {
  title: 'Assam Electronics',
  description: 'Quick commerce electronics shop',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin:0, padding:0}}>
        {children}
      </body>
    </html>
  )
}
