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
    <div>
      <div className="mb-16">
        <Outlet></Outlet>
      </div>
      <div className="
        w-full h-16 flex fixed bottom-0 left-0
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
    </div>
  )
}

