export default {
	props: {
		chartHeight: {
			type: String,
			default: "350px"
		},
		inDialog: {
			type: Boolean,
			default: false
		},
		hideQuery: {
			type: Boolean,
			default: false
		},
		showQuery: {
			type: Boolean,
			default: false
		},
		noPage: {
			type: Boolean,
			default: false
		},
		orderProp: {
			type: String,
			default: ""
		},
		orderDesc: {
			default: null
		}
	},
	data() {
		return {
			api: null
		}
	},
	methods: {
		getDataOnce(params) {
			this.$refs.chart.getDataOnce(params);
		},
		getData(params) {
			this.$refs.chart.getData(params);
		},
		reload() {
			this.$refs.chart.getData();
		},
		query() {
			this.$refs.chart.query();
		},
		clear() {
			this.$refs.chart.clear();
		}
	}
}