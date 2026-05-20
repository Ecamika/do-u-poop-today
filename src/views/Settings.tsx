import { type JSX } from 'react'
import { Modal, Button } from '@heroui/react'
import { CircleExclamation } from '@gravity-ui/icons'
import { useShitManager } from '../shitManager'

function MainLayout({ children }: { children: JSX.Element[] }) {
	return (
		<div className="w-screen flex flex-col items-center justify-start gap-8 pt-8">{children}</div>
	)
}

function ClearShitTimeBtn() {
	const shitManager = useShitManager()
	return (
		<div className="w-[80%]">
			<Modal>
				<Button variant="danger" fullWidth className="font-bold">
					清空阿石记录
				</Button>
				<Modal.Backdrop>
					<Modal.Container placement="center">
						<Modal.Dialog>
							<Modal.CloseTrigger></Modal.CloseTrigger>
							<Modal.Header>
								<Modal.Icon className="bg-default text-foreground">
									<CircleExclamation className="size-5"></CircleExclamation>
								</Modal.Icon>
								<Modal.Heading className="font-bold">确定要清空阿石记录嘛？</Modal.Heading>
							</Modal.Header>
							<Modal.Body>
								<p>😭😭😭😭😭😭😭😭😭😭</p>
							</Modal.Body>
							<Modal.Footer>
								<Button slot="close" variant="tertiary" fullWidth>
									我后悔了
								</Button>
								<Button
									slot="close"
									variant="danger-soft"
									fullWidth
									onClick={() => shitManager.clearShitTimes()}
								>
									清空！！
								</Button>
							</Modal.Footer>
						</Modal.Dialog>
					</Modal.Container>
				</Modal.Backdrop>
			</Modal>
		</div>
	)
}

export default function Settings() {
	return (
		<MainLayout>
			<ClearShitTimeBtn></ClearShitTimeBtn>
			<div></div>
		</MainLayout>
	)
}
