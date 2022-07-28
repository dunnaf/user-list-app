export interface Props {
  links: ILinks[]
}

interface ILinks {
  href: string
  title: string
  active: boolean
}
