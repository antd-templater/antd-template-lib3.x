import { PropType, defineComponent } from 'vue'
import * as AllIcons from '@ant-design/icons-vue'

type AllIconType = Exclude<keyof typeof AllIcons, NotIconType>
type NotIconType = 'setTwoToneColor' | 'getTwoToneColor' | 'createFromIconfontCN' | 'default'

export const isIconType = (type: string): type is AllIconType => {
  return (
    type !== 'default' &&
    type !== 'getTwoToneColor' &&
    type !== 'setTwoToneColor' &&
    type !== 'createFromIconfontCN' &&
    type && (AllIcons as any)[type] && true || false
  )
}

export const SIcon = defineComponent({
  name: 'SIcon',
  props: {
    type: {
      type: String as PropType<AllIconType>,
      required: true
    },
    spin: {
      type: Boolean,
      default: false
    },
    rotate: {
      type: Number,
      default: undefined
    },
    twoToneColor: {
      type: [String, Array] as PropType< string | [string, string]>,
      default: undefined
    }
  },
  setup(props) {
    const Icon = AllIcons[props.type]
    const binds = { ...props, type: undefined }
    return () => isIconType(props.type) ? <Icon { ...binds }/> : null
  }
})

export default SIcon