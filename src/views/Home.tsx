import { useState, type JSX } from "react"
import { Card, Calendar, Modal, Button } from "@heroui/react"
import { Text, MusicNote, CircleCheck } from '@gravity-ui/icons'
import { useInterval } from 'ahooks'
import GreenWall from "../components/GreenWall"
import { useShitManager } from "../shitManager"

const poopTips = [
  {
    content: '有些人在厕所里阅读，有些人在那里思考人生。而提利昂·兰尼斯特，在那里策划了他一半的胜利。',
    author: '乔治·R·R·马丁'
  },
  {
    content: '诗歌不能使任何事情发生，就像拉屎一样，它是一种排泄，使身体舒畅，仅此而已。',
    author: 'W.H. 奥登'
  },
  {
    content: '我们生来就在屎尿之间。',
    author: '圣奥古斯丁'
  },
  {
    content: '托马斯看着厕所的抽水马桶，认为这比任何形而上学都更令人安心——一按，所有的羞耻与负担都冲走了。',
    author: '米兰·昆德拉'
  },
  {
    content: '我就像个掏粪工，把那些藏污纳垢的东西一勺一勺舀出来给大家看罢了。',
    author: '鲁迅'
  },
  {
    content: '选择生活，选择工作，选择职业，选择家庭……选择坐在沙发上看电视，往嘴里塞垃圾食品，选择腐烂——到最后，你他妈连一泡像样的屎都拉不出来。',
    author: '《猜火车》'
  },
  {
    content: '人生就像一盒巧克力，你永远不知道下一颗是什么味儿。拉屎也差不多——有时候顺畅，有时候得使出吃奶的劲儿。',
    author: '《阿甘正传》'
  }
]

function MainLayout({ children }: { children: JSX.Element[] }) {
  return (
    <div className="w-screen flex flex-col items-center justify-start gap-8">
      {children}
    </div>
  )
}

function Title() {
  return (
    <div className="w-full flex items-center justify-center pt-4 pb-4 bg-blue-50 border-b-2 border-b-blue-100 shadow-lg">
      <h1 className="text-3xl text-cyan-600 select-none font-bold">你今天拉屎了吗？</h1>
    </div>
  )
}

function TipBox() {
  const [tipIndex, setTipIndex] = useState(0)

  const content = poopTips[tipIndex].content
  const author = poopTips[tipIndex].author

  useInterval(() => {
    setTipIndex(index => index >= poopTips.length - 1 ? 0 : index + 1)
  }, 10000)

  return (
    <div className="w-full">
      <Card className="w-[80%] mr-auto ml-auto h-40">
        <Text></Text>
        <Card.Header className="h-full">
          <Card.Title>你知道吗？</Card.Title>
          <Card.Description>{content}</Card.Description>
          <Card.Description className="ml-auto mr-4 mt-auto italic">—— {author}</Card.Description>
        </Card.Header>
      </Card>
    </div>
  )
}

function PoopCalendar() {
  return (
    <div className="w-full">
      <Calendar className="bg-blue-50 mr-auto ml-auto box-content p-4 rounded-2xl">
        <Calendar.Header>
          <Calendar.YearPickerTrigger>
            <Calendar.YearPickerTriggerHeading></Calendar.YearPickerTriggerHeading>
            <Calendar.YearPickerTriggerIndicator></Calendar.YearPickerTriggerIndicator>
          </Calendar.YearPickerTrigger>
          <Calendar.NavButton slot="previous"></Calendar.NavButton>
          <Calendar.NavButton slot="next"></Calendar.NavButton>
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {day => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>
            {date => <Calendar.Cell date={date}></Calendar.Cell>}
          </Calendar.GridBody>
        </Calendar.Grid>
        <Calendar.YearPickerGrid>
          <Calendar.YearPickerGridBody>
            {({year}) => <Calendar.YearPickerCell year={year}></Calendar.YearPickerCell>}
          </Calendar.YearPickerGridBody>
        </Calendar.YearPickerGrid>
      </Calendar>
    </div>
  )
}

function ShitGreenWall() {
  const shitManager = useShitManager()

  const date = new Date()

  const MAX_WEEK = 30

  const wallCells = []

  for (let i = 0; i < MAX_WEEK; i++) {
    const weekCells: number[] = []

    for (let j = 0; j < 7; j++) {
      const times = shitManager.getShitTime(date)?.times ?? 0

      weekCells.push(
        times >= 4 ? 4 : times
      )
      date.setDate(date.getDate() - 1)
    }

    wallCells.push(weekCells.toReversed())
  }

  wallCells.reverse()

  return <GreenWall wallCells={wallCells}></GreenWall>
}

function ShitModal() {
  const shitManager = useShitManager()

  let continuousShitTimes = 0

  const date = new Date()

  const recentlyShitTimesCounter = () => {
    const record = shitManager.getShitTime(date)
    if (record && record.times >= 1) {
      continuousShitTimes++
      date.setDate(date.getDate() - 1)
      recentlyShitTimesCounter()
    }
  }

  recentlyShitTimesCounter()

  return (
    <div>
      <Modal>
        <Button size="lg" onClick={() => shitManager.addShitTime()}>
          <MusicNote></MusicNote>
          <p className="font-bold">我要拉屎！</p>
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="center">
            <Modal.Dialog>
              <Modal.CloseTrigger></Modal.CloseTrigger>
              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <CircleCheck className="size-6"></CircleCheck>
                </Modal.Icon>
                <Modal.Heading>成功拉屎！</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>
                  你已连续拉屎{continuousShitTimes}天！
                </p>
                <p>
                  坚持每天拉屎！养成良好的排便习惯！
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full" slot="close">
                  确定
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  )
}

export default function Home() {
  return (
    <MainLayout>
      <Title></Title>
      <ShitGreenWall></ShitGreenWall>
      <TipBox></TipBox>
      <ShitModal></ShitModal>
      <PoopCalendar></PoopCalendar>
    </MainLayout>
  )
}

