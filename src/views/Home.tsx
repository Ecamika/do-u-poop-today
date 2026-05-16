import { useEffect, useState, type JSX } from "react"
import { Card, Calendar, Modal, Button, TextArea } from "@heroui/react"
import { Text, MusicNote, CircleCheck, Calendar as CalendarIcon, SquareChartBar } from '@gravity-ui/icons'
import { useDebounce, useInterval, useSize } from 'ahooks'
import GreenWall from "../components/GreenWall"
import { useShitManager } from "../shitManager"
import { getLocalTimeZone, today, type DateValue } from "@internationalized/date"

const poopTips = [
  {
    content: '有些人在厕所里阅读，有些人在那里思考人生。而提利昂·兰尼斯特，在那里策划了他一半的胜利。',
    author: '乔治·R·R·马丁'
  },
  {
    content: '诗歌不能使任何事情发生，就像阿石一样，它是一种排泄，使身体舒畅，仅此而已。',
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
    content: '人生就像一盒巧克力，你永远不知道下一颗是什么味儿。阿石也差不多——有时候顺畅，有时候得使出吃奶的劲儿。',
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
      <h1 className="text-3xl text-cyan-600 select-none font-bold">你今天阿石了吗？</h1>
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
      <Card className="w-[80%] mr-auto ml-auto h-40 flex-row">
        <Text className="size-8"></Text>
        <Card.Header className="h-full w-full">
          <Card.Title className="font-bold text-xl mb-2">你知道吗？</Card.Title>
          <Card.Description>{content}</Card.Description>
          <Card.Description className="ml-auto mr-4 mt-auto italic">—— {author}</Card.Description>
        </Card.Header>
      </Card>
    </div>
  )
}

function TodayShitTime() {
  const shitManager = useShitManager()

  const shitTimes = shitManager.getShitTime()?.times ?? 0

  let descText: string

  if (shitTimes === 0) {
    descText = '😭你今天都没有阿石，是有什么心事嘛？'
  } else if (shitTimes === 1) {
    descText = '🥰每天一阿石，医生远离我'
  } else if (shitTimes === 2) {
    descText = '🤓阿石使我心情愉悦！'
  } else {
    descText = '😍😍😍最爱阿石！'
  }

  return (
    <div className="w-[80%]">
      <Card className="w-full flex-row">
        <CalendarIcon className="size-8"></CalendarIcon>
        <Card.Header className="h-full w-full">
          <Card.Title className="font-bold text-xl mb-2">今日阿石</Card.Title>
          <Card.Description>你今天的阿石次数是：<span className="font-bold text-xl">{shitTimes}次！</span></Card.Description>
          <Card.Description className="mt-2">{descText}</Card.Description>
        </Card.Header>
      </Card>
    </div>
  )
}

function PoopCalendar(
  {
    value,
    onChange,
    focusedValue,
    onFocusChange
  }: {
    value?: DateValue | null,
    onChange?: (value: DateValue) => void,
    focusedValue?: DateValue | null,
    onFocusChange?: (value: DateValue) => void
  }
) {
  return (
    <div className="bg-blue-50 pt-4 pb-4 rounded-2xl w-[80%]">
      <Calendar
        className="mr-auto ml-auto"
        value={value}
        onChange={onChange}
        focusedValue={focusedValue}
        onFocusChange={onFocusChange}
      >
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
  const { width: windowInnerWidth } = useSize(document.body)!
  const greenWallWidth = windowInnerWidth * 0.8

  const shitManager = useShitManager()

  const date = new Date()

  const weeks = greenWallWidth / (16 + 4)

  const wallCells = []

  for (let i = 0; i < weeks; i++) {
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

  return <GreenWall wallCells={wallCells} cellGap="4px" cellSize="16px"></GreenWall>
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
    <div className="w-[80%]">
      <Modal>
        <Button size="lg" className="w-full h-20" onClick={() => shitManager.addShitTime()}>
          <MusicNote className="size-8"></MusicNote>
          <p className="font-bold text-2xl">我要阿石！</p>
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="center">
            <Modal.Dialog>
              <Modal.CloseTrigger></Modal.CloseTrigger>
              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <CircleCheck className="size-6"></CircleCheck>
                </Modal.Icon>
                <Modal.Heading>成功阿石！</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <p>
                  你已连续阿石{continuousShitTimes}天！
                </p>
                <p>
                  坚持每天阿石！养成良好的阿石习惯！
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full" slot="close">
                  我会每天认真阿石的！
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  )
}

function ShitNote() {
  const shitManager = useShitManager()
  const [note, setNote] = useState(shitManager.getShitTime()?.note ?? '')
  const debouncedNote = useDebounce(note, { wait: 2000 })
  useEffect(() => {
    shitManager.setShitNote(debouncedNote)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNote])

  return (
    <div className="w-[80%] bg-gray-100 rounded-2xl p-4 box-border flex flex-col gap-4">
      <p className="font-bold text-xl">觉得阿石太无聊了？来写篇石记！</p>
      <TextArea
        fullWidth
        placeholder="写篇石记，记录美好生活！🤩"
        value={note}
        onChange={v => setNote(v.currentTarget.value)}
        className="min-h-30"
      ></TextArea>
    </div>
  )
}

function ShitInfo({ date }: { date: Date }) {
  const shitManager = useShitManager()
  const record = shitManager.getShitTime(date)

  return (
    <div className="w-[80%]">
      <Card className="w-full flex-row">
        <SquareChartBar className="size-8"></SquareChartBar>
        <Card.Header>
          <Card.Title className="font-bold text-xl mb-2">
            {date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日
          </Card.Title>
          {
            (record === undefined || record.times === 0)
            ? <>
              <Card.Description>这天你居然没有阿石！😨</Card.Description>
              <Card.Description>这天是出了什么事情？还是单纯是你忘了阿石？</Card.Description>
            </>
            : <>
              <Card.Description>在这天你一共阿了 <span className="font-bold text-xl">{record.times}次！</span>😋😋😋</Card.Description>
            </>
          }
          {
            (record?.note) &&
            <>
              <Card.Title className="font-bold text-xl mb-2 mt-8">你在这天写的石记</Card.Title>
              <Card.Description>{record.note}</Card.Description>
            </>
          }
        </Card.Header>
      </Card>
    </div>
  )
}

export default function Home() {
  const [date, setDate] = useState<DateValue>(today(getLocalTimeZone()))
  const [focusedDate, setFocusedDate] = useState<DateValue>(today(getLocalTimeZone()))

  return (
    <MainLayout>
      <Title></Title>
      <TodayShitTime></TodayShitTime>
      <ShitGreenWall></ShitGreenWall>
      <TipBox></TipBox>
      <ShitModal></ShitModal>
      <ShitNote></ShitNote>
      <PoopCalendar
        value={date}
        onChange={setDate}
        focusedValue={focusedDate}
        onFocusChange={setFocusedDate}
      ></PoopCalendar>
      <ShitInfo date={date.toDate(getLocalTimeZone())}></ShitInfo>
    </MainLayout>
  )
}

