//import { LangData } from "@/service/busService.model";

export { }

declare global {
    interface String {
        toNumber(): number;
        isEmptyOrNull(): boolean;

        getlogoSvg(darkTheme: boolean): string;
        getlogoPng(darkTheme: boolean): string;

        getwebViewIconSvg(): string;
        getIconSvg(): string;
        getIconHomeSvg(): string;
        getIconHomeAnnouncementSvg(): string;
        getIconHomeBusPlanningSvg(): string;
        getIconPassengerServices(): string;

        getImg(): string;
        getImgBusSvg(): string;
        getImgBusBusPlanningSvg(): string;
        getImgBusFareSearchSvg(): string;
        getImgBusRouteSearchSvg(): string;
        getImgBusTechpayListSvg(): string;
        getImgPhone(): string;
        getImgFriendlyService(): string;
        getImgAnnouncementSvg(): string;
        getImgErrorSvg(): string;
        getImgFooterSvg(): string;
        getImgFriendlySearchResultSvg(): string;
        getImgHeaderSvg(): string;
        getImgMapSvg(): string;
        getImgOpenDataAnnouncementSvg(): string;
        getImgBusTransInfo(): string;
        getImgHome(): string;
        getImgBannerSvg(): string;
        getImgBusPlanningSvg(): string;
        getImgFriendshipList(): string;
        getImGrouteSearchSvg(): string;
        getWebviewBusTransferInfoPng(): string;
        getWebviewPng(): string;

    }
}


String.prototype.toNumber = function (): number {

    if (this == null)
        return -1;
    if (this == null || this == "" || this == "null")
        return -1;
    let num = Number(this);
    if (isNaN(num))
        return -1;
    return num;
}


String.prototype.isEmptyOrNull = function (): boolean {
    if (this == null || this == "" || this == "null")
        return true;

    return false;
}


String.prototype.getwebViewIconSvg = function (): string {
    const dir = localStorage.getItem('theme')
    let fileName = this;
    return new URL(`../assets/webview/${dir}/${fileName}.svg`, import.meta.url).href
}

String.prototype.getIconSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/icon/${fileName}.svg`, import.meta.url).href
}
String.prototype.getIconHomeSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/icon/home/${fileName}.svg`, import.meta.url).href
}
String.prototype.getIconHomeAnnouncementSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/icon/home/announcement/${fileName}.svg`, import.meta.url).href
}
String.prototype.getIconHomeBusPlanningSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/icon/home/busPlanning/${fileName}.svg`, import.meta.url).href
}

String.prototype.getIconPassengerServices = function (): string {
    let fileName = this;
    return new URL(`../assets/icon/passengerServices/${fileName}.svg`, import.meta.url).href
}

String.prototype.getImgAnnouncementSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/announcement/${fileName}.svg`, import.meta.url).href
}
String.prototype.getImgErrorSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/error404/${fileName}.svg`, import.meta.url).href
}
String.prototype.getImgFooterSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/footer/${fileName}.svg`, import.meta.url).href
}
String.prototype.getImgFriendlySearchResultSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/friendlySearchResult/${fileName}.svg`, import.meta.url).href
}
String.prototype.getImgHeaderSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/header/${fileName}.svg`, import.meta.url).href
}
String.prototype.getImgMapSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/map/${fileName}.svg`, import.meta.url).href
}
String.prototype.getImgOpenDataAnnouncementSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/openDataAnnouncement/${fileName}.svg`, import.meta.url).href
}


String.prototype.getImgBusSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/bus/${fileName}.svg`, import.meta.url).href
}
String.prototype.getImgBusBusPlanningSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/bus/busPlanning/${fileName}.svg`, import.meta.url).href
}
String.prototype.getImgBusFareSearchSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/bus/fareSearch/${fileName}.svg`, import.meta.url).href
}

String.prototype.getImgBusRouteSearchSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/bus/routeSearch/${fileName}.svg`, import.meta.url).href
}

String.prototype.getImgBusTechpayListSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/bus/techpayList/${fileName}.svg`, import.meta.url).href
}









String.prototype.getImgPhone = function (): string {
    let fileName = this;
    return new URL(`../assets/img/passengerServices/phoneVoice/${fileName}`, import.meta.url).href
}
String.prototype.getImgBusTransInfo = function (): string {
    let fileName = this;
    return new URL(`../assets/img/passengerServices/busTransInfo/${fileName}`, import.meta.url).href
}
String.prototype.getImgFriendlyService = function (): string {
    let fileName = this;
    return new URL(`../assets/img/friendlyService/${fileName}`, import.meta.url).href
}


String.prototype.getImg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/${fileName}`, import.meta.url).href
}

String.prototype.getImgHome = function (): string {
    let fileName = this;
    return new URL(`../assets/img/home/${fileName}`, import.meta.url).href
}
String.prototype.getImgBannerSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/home/banner/${fileName}.svg`, import.meta.url).href
}
String.prototype.getImgBusPlanningSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/home/busPlanning/${fileName}.svg`, import.meta.url).href
}
String.prototype.getImgFriendshipList = function (): string {
    let fileName = this;
    return new URL(`../assets/img/home/friendshipList/${fileName}`, import.meta.url).href
}
String.prototype.getImGrouteSearchSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/img/home/routeSearch/${fileName}.svg`, import.meta.url).href
}

String.prototype.getWebviewBusTransferInfoPng = function (): string {
    const dir = localStorage.getItem('theme')
    let fileName = this;
    return new URL(`../assets/webview/${dir}/busTrans/${fileName}.png`, import.meta.url).href
}
String.prototype.getWebviewPng = function (): string {
    const dir = localStorage.getItem('theme')
    let fileName = this;
    return new URL(`../assets/webview/${dir}/${fileName}.png`, import.meta.url).href
}


String.prototype.getlogoSvg = function (): string {
    let fileName = this;
    return new URL(`../assets/logo/${fileName}.svg`, import.meta.url).href
}


