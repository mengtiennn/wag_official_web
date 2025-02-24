type Contents = {
    label: string,
    key: string,
    content: string
}
export class SideBarModel{
    public header: string
    public subTitle: string
    public contents: Array<Contents>
}