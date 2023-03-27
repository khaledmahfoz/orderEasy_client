import {H} from '../Credentials/Credentials'

function createZone(latitude, longitude) {
	let circle
	if (H) {
		circle = new H.map.Circle(
			{lat: latitude, lng: longitude},
			10000,
			{
				style: {
					strokeColor: 'rgba(248,105,50,0.5)',
					lineWidth: 3,
					fillColor: 'rgba(248,105,50,0.1)'
				}
			}
		);


		circle.addEventListener('pointerenter', function () {
			document.body.style.cursor = 'pointer';
		}, true);

		circle.addEventListener('pointerleave', function () {
			document.body.style.cursor = 'default';
		}, true);
	}

	return circle
}

export default createZone
