import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class SelectProps extends Vue {
	@Prop({ type: Array, default: () => [] })
	public readonly items!: any[];

	@Prop({ type: Boolean, default: false })
	public readonly objMode!: boolean;

	@Prop({ type: [String, Number], default: '' })
	public readonly itemText!: string | number;

	@Prop({ type: Boolean, default: false })
	public readonly returnObject!: boolean;

	@Prop({ type: Boolean, default: false })
	public readonly multiple!: boolean;

	@Prop({ type: String, default: '' })
	public readonly maxWidth!: string;

	@Prop({ type: String, default: '' })
	public readonly minWidth!: string;
};
