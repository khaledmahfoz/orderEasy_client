import {H} from '../Credentials/Credentials'

function createZone(latitude, longitude) {
	let circle = new H.map.Circle(
		{lat: latitude, lng: longitude}, //center
		10000, // Radius in meters
		{
			style: {
				strokeColor: 'rgba(248,105,50,0.5)', // Color of the perimeter
				lineWidth: 3,
				fillColor: 'rgba(248,105,50,0.1)' // Color of the circle
			}
		}
	);
	// circle.draggable = true;

	circle.addEventListener('pointerenter', function () {
		document.body.style.cursor = 'pointer';
	}, true);

	circle.addEventListener('pointerleave', function () {
		document.body.style.cursor = 'default';
	}, true);

	// map.addEventListener('dragstart', function (event) {
	// 	map.removeObjects([circle])
	// }, true);
	// map.addEventListener('dragend', function (event) {
	// 	map.addObject(circle);
	// }, true);

	return circle
}

export default createZone
