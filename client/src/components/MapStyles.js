const MapStyles = [
	{
		featureType: "administrative.country",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "on",
			},
			{
				color: "#bcdb97",
			},
		],
	},
	{
		featureType: "administrative.province",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#d1ae77",
			},
			{
				visibility: "on",
			},
		],
	},
	{
		featureType: "administrative.locality",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#d1ae77",
			},
			{
				visibility: "on",
			},
		],
	},
	{
		featureType: "administrative.neighborhood",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "on",
			},
			{
				color: "#d1ae77",
			},
		],
	},
	{
		featureType: "landscape.man_made",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#d0e9ad",
			},
		],
	},
	// {
	// 	featureType: "landscape.natural",
	// 	elementType: "geometry.fill",
	// 	stylers: [
	// 		{
	// 			// color: "#d0e9ad",
	// 		},
	// 	],
	// },
	// {
	// 	featureType: "landscape.natural",
	// 	elementType: "geometry.fill",
	// 	stylers: [
	// 		{
	// 			color: "#ffffff",
	// 		},
	// 		{
	// 			visibility: "on",
	// 		},
	// 	],
	// },
	// {
	// 	featureType: "landscape.natural.landcover",
	// 	elementType: "geometry.fill",
	// 	stylers: [
	// 		{
	// 			color: "#d0e9ad",
	// 		},
	// 		{
	// 			visibility: "on",
	// 		},
	// 	],
	// },
	// {
	// 	featureType: "landscape.natural.landcover",
	// 	elementType: "labels.text.fill",
	// 	stylers: [
	// 		{
	// 			saturation: "-55",
	// 		},
	// 		{
	// 			visibility: "on",
	// 		},
	// 		{
	// 			hue: "#00ffff",
	// 		},
	// 	],
	// },
	{
		featureType: "landscape.natural.terrain",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "on",
			},
			{
				gamma: "2.45",
			},
			{
				weight: "4.29",
			},
			{
				color: "#a7ca74",
			},
		],
	},
	{
		featureType: "road",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#d1ae77",
			},
			{
				visibility: "on",
			},
			{
				weight: "3.30",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.fill",
		stylers: [
			{
				saturation: "100",
			},
			{
				lightness: "5",
			},
			{
				visibility: "simplified",
			},
			{
				color: "#a2db97",
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "on",
			},
			{
				color: "#d1ae77",
			},
		],
	},
	{
		featureType: "road.local",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "on",
			},
			{
				color: "#d1ae77",
			},
		],
	},
	{
		featureType: "road.local.trail",
		elementType: "geometry.fill",
		stylers: [
			{
				lightness: "-5",
			},
			{
				visibility: "on",
			},
			{
				color: "#78909C",
			},
		],
	},
	{
		featureType: "water",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "on",
			},
			{
				color: "#29cfff",
			},
		],
	},
]

export default MapStyles
