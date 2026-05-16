import { Outlet, useMatch, type PathMatch, useNavigate } from "react-router-dom"
import { Button } from '@heroui/react'
import { House, Gear } from '@gravity-ui/icons'

function getBtnVariant(isMatch: PathMatch<string> | null) {
  return isMatch ? 'secondary' : 'tertiary'
}

export default function RootLayout() {
  const isMatchHome = useMatch('/')
  const isMatchSettings = useMatch('/settings')
  const navigate = useNavigate()

  return (
    <div className="flex flex-col-reverse w-screen h-screen">
      <div className="
        w-full h-16 flex mt-auto
        flex-row justify-evenly items-center gap-4
        pl-8 pr-8
      ">
        <Button fullWidth size="lg" variant={getBtnVariant(isMatchHome)} onClick={() => navigate('/')}>
          {<House></House>}
          首页
        </Button>
        <Button fullWidth size="lg" variant={getBtnVariant(isMatchSettings)} onClick={() => navigate('/settings')}>
          {<Gear></Gear>}
          设置
        </Button>
      </div>
      <Outlet></Outlet>
    </div>
  )
}

