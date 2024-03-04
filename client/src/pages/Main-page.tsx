import { useEffect } from 'react'


export const MainPage = () => {
  useEffect(() => {
    console.log('render')
  }, [])
  return (
    <div>
      main
    </div>
  )
}