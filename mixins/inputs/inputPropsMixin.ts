import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class InputProps extends Vue {
	@Prop({ type: String, default: '' })
	public readonly name!: string;

	@Prop({ type: String, default: '' })
	public readonly placeholder!: string;

	@Prop({ type: Boolean, default: false })
	public readonly required!: boolean;

	@Prop({ type: Boolean, default: false })
	public readonly disabled!: boolean;

	@Prop({ type: String, default: '' })
	public readonly label!: string;

	@Prop({ type: String, default: '' })
	public readonly errorMessage!: string;

	@Prop({ type: String, default: '' })
	public readonly maxWidth!: string;

	@Prop({ type: String, default: '' })
	public readonly minWidth!: string;
};
