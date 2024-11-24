import {Swiper as Slider} from "swiper";
import {IHistoryItem} from "./contracts";
import {action, makeObservable} from "mobx";
import {StyleLoader} from "../../lib/style-loader";

export class ViewController {
    transitionTime = 1000 //ms
    historyIndex: number = 0
    isTransition: boolean = false
    swiper: Slider | undefined = undefined
    isFontLoaded: boolean = false
    isInited: boolean = false
    forceRenderFlag = 0

    dom!: HTMLDivElement
    ro!: ResizeObserver
    containerId = 'history-overview_container'
    fullWidth = 1440

    get historyItem() {
        return this.historyItems[this.historyIndex]
    }

    constructor(public historyItems: IHistoryItem[]) {
        makeObservable(this, {
            historyIndex: true,
            isTransition: true,
            swiper: true,
            forceRenderFlag: true,
            isFontLoaded: true,
            isInited: true,

            setHistoryIndex: action,
            setIsTransition: action,
            setSwiper: action,
            forceRerender: action,
            setIsFontLoaded: action,
            setIsInited: action,
        })

    }

    init = async (dom: HTMLDivElement | null) => {
        if (!dom) return
        if (!this.historyItems.length) return
        if (this.isInited) return

        this.dom = dom
        await this.fontLoading()
        this.setRO()
        this.setIsInited(true)
    }

    private async fontLoading() {
        const display = 'block'
        let fonts = [
            'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700',
            'https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700'
        ]
        this.setIsFontLoaded(
            await Promise
                .all(fonts.map((font) => StyleLoader.load(font + `&display=${display}`)))
                .then((res) => !res.some(loaded => !loaded))
                .catch((err) => false)
        )
    }

    private setRO() {
        this.ro = new ResizeObserver(() => {
            const rect = this.dom.getBoundingClientRect()
            const dif = rect.width / this.fullWidth;
            (this.dom.firstElementChild as HTMLElement).style.transform = `scale(${dif})`;
        })

        this.ro.observe(this.dom)
    }

    setHistoryIndex = (index: number) => {
        this.historyIndex = index
    }

    setIsTransition = (value: boolean) => {
        this.isTransition = value
    }

    setIsFontLoaded(value: boolean) {
        this.isFontLoaded = value
    }

    setIsInited(value: boolean) {
        this.isInited = value
    }

    changeHistoryIndex = (index: number) => {
        if (index === this.historyIndex) return
        this.setHistoryIndex(index)
        this.setIsTransition(true)
        this.swiper.slideReset()
    }

    setSwiper = (swiper: Slider) => {
        this.swiper = swiper
    }

    forceRerender = () => {
        this.forceRenderFlag++
    }

    onTransitionEnd = (event: Event) => {
        if (event.target !== event.currentTarget) return
        this.setIsTransition(false)
    }

    onSlideNext = () => {
        this.swiper?.slideNext()
    }

    onSlidePrev = () => {
        this.swiper?.slidePrev()
    }

    get state() {
        return {
            isInited: this.isInited && !!this.swiper,
            renderFlag: this.forceRenderFlag,
            swiper: this.swiper,
            historyIndex: this.historyIndex,
        }
    }

    dispose = () => {
        this.ro.disconnect()
    }
}