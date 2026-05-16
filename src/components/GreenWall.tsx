import cn from 'classnames'

function numToGreenWallCelLRgb(num: number) {
  switch (num) {
    case 0: return '#dadada'
    case 4: return '#033a16'
    case 3: return '#196c2e'
    case 2: return '#2ea043'
    case 1: return '#56d364'
  }
}

function numToGreenWallCell(num: number, key: string, size: string) {
  const rgb = numToGreenWallCelLRgb(num)
  return (
    <div style={{ backgroundColor: rgb, width: size, height: size }} className="rounded" key={key}></div>
  )
}

export interface GreenWallProps {
  className?: string
  wallCells: number[][]
  cellSize?: string
  cellGap?: string
}

export default function GreenWall(
  { className = "", wallCells: wallGrids, cellSize: gridSize = '1rem', cellGap = '0.25rem' }: GreenWallProps
) {
  const cells = wallGrids.map(
    (v, i1) => v.map(
      (v, i2) => numToGreenWallCell(v, i1.toString() + i2.toString(), gridSize)
    )
  )

  const columns = cells.map((v, i) => <div className="flex flex-col" style={{ gap: cellGap }} key={i}>{v}</div>)

  return (
    <div className={cn(className, 'flex')} style={{ gap: cellGap }}>
      {columns}
    </div>
  )
}
