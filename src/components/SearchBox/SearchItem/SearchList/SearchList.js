import React from 'react'

import classes from './SearchList.module.css'

const searchList = props => {
	let list
	let lat, lng
	if (props.suggested && props.suggested.length) {
		list = props.suggested.map(elem => {
			let countryName, county, city
			if (elem.address && elem.position) {
				countryName = elem.address.countryName
				county = elem.address.county
				city = elem.address.city
				lat = elem.position.lat
				lng = elem.position.lng
			}
			const coords = {
				latitude: lat,
				longitude: lng,
			}
			let searchListResult = elem.position ? (
				<li onClick={() => props.createMap(true, coords)} key={elem.id}>
					<a>
						<strong>{elem.title}</strong>
						<div>
							{countryName ? elem.address.countryName + ',' : null}
							{county ? elem.address.county + ',' : null}
							{city ? elem.address.city : null}
						</div>
					</a>
				</li>
			) : null
			return searchListResult
		})
	} else {
		list = <li>No Results Found</li>
	}
	return props.suggested !== null ? (
		<ul className={classes.SearchList}>{list}</ul>
	) : null
}

export default searchList
