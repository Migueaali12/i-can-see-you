import { useEffect, useRef, type ReactNode } from "react"
import { X } from "lucide-react"
import { useTranslations, getRelativeLocaleUrl } from "@/i18n/utils"
import type { Lang } from "@/i18n/ui"
import { GitHub } from "@/components/ui/Github"
import ThemeToggle from "@/components/ui/ThemeToggle"
import LanguagePicker from "@/components/ui/LanguagePicker"
import Button from "../ui/Button"

interface MobileMenuProps {
	lang: Lang
	isOpen: boolean
	onClose: () => void
}

interface NavLinkProps {
	href: string
	children: ReactNode
	onClick: () => void
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => (
	<a
		href={href}
		onClick={onClick}
		className='inline-block text-[1.35rem] font-bold uppercase tracking-wider text-(--color-on-card) underline decoration-2 transition-[color,transform] duration-150 ease-in-out hover:-rotate-1 hover:scale-[1.05] hover:text-(--color-secondary)'
	>
		{children}
	</a>
)

export default function MobileMenu({ lang, isOpen, onClose }: MobileMenuProps) {
	const t = useTranslations(lang)
	const dialogRef = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return

		const handleCancel = (event: Event) => {
			event.preventDefault()
			onClose()
		}

		dialog.addEventListener("cancel", handleCancel)

		if (isOpen && !dialog.open) {
			dialog.showModal()
			document.body.style.overflow = "hidden"
		} else if (!isOpen && dialog.open) {
			dialog.close()
			document.body.style.overflow = ""
		}

		return () => {
			dialog.removeEventListener("cancel", handleCancel)
			document.body.style.overflow = ""
		}
	}, [isOpen, onClose])

	return (
		<dialog
			ref={dialogRef}
			id='mobile-menu'
			role='dialog'
			aria-modal='true'
			aria-label={t("nav.main")}
			onClick={(event) => {
				if (event.target === dialogRef.current) onClose()
			}}
			className='m-0 h-screen max-h-screen w-screen max-w-full overflow-hidden bg-transparent p-0 backdrop:bg-black/40 open:animate-in open:fade-in'
		>
			<div className='notebook-bg relative flex min-h-screen flex-col items-center justify-center px-6 py-12'>
				<div className='absolute right-4 top-4'>
					<Button
						size='sm'
						icon={<X size={24} strokeWidth={2} />}
						onClick={onClose}
						innerClassName='h-11 w-11 p-0 items-center justify-center bg-(--color-card)'
					/>
				</div>

				<nav aria-label={t("nav.main")} className='relative w-full max-w-xs'>
					<div
						className='absolute inset-0 translate-x-2 translate-y-2 bg-(--color-shadow)'
						aria-hidden='true'
					/>
					<div className='relative border-2 border-(--color-border) bg-(--color-card) p-8'>
						<div
							className='absolute inset-[10px] border border-dashed border-(--color-outline-variant) pointer-events-none'
							aria-hidden='true'
						/>

						<div className='relative z-10 flex flex-col items-center gap-6'>
							<p className='font-display text-[1.6rem] font-semibold text-(--color-on-card)'>
								{t("nav.menu")}
							</p>

							<ul className='m-0 flex list-none flex-col items-center gap-5 p-0'>
								<li className='text-(--color-on-card)'>
									<NavLink href={getRelativeLocaleUrl(lang, "/signals")} onClick={onClose}>
										{t("nav.signals")}
									</NavLink>
								</li>
								<li className='text-(--color-on-card)'>
									<NavLink href={getRelativeLocaleUrl(lang, "/demo")} onClick={onClose}>
										{t("nav.demo")}
									</NavLink>
								</li>
							</ul>

							<div className='flex items-center gap-8'>
								<LanguagePicker lang={lang} />
								<ThemeToggle lang={lang} />
								<a
									href='https://github.com/Migueaali12/i-can-see-you'
									target='_blank'
									rel='noopener noreferrer'
									aria-label={t("nav.githubAria")}
									className='inline-flex items-center justify-center rounded-md bg-(--color-card) transition-[color,transform] duration-150 ease-in-out hover:scale-[1.15] hover:text-(--color-secondary)'
								>
									<GitHub width={20} height={20} />
								</a>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</dialog>
	)
}
