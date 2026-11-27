declare module "culori" {
	export const oklch: (color: string | { mode: "oklch"; l: number; c: number; h: number }) => {
		l: number;
		c: number;
		h: number;
		alpha: number;
	};

	export const rgb: (color: { mode: "oklch"; l: number; c: number; h: number }) =>
		| {
				r: number;
				g: number;
				b: number;
		  }
		| undefined;

	export const wcagContrast: (a: string, b: string) => number;

	export const formatHex8: (color: string) => string;
}
