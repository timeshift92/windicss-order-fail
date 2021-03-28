<nu-btn width="min 10" columns="1fr auto" value="six">
	<nu-value list />
	<nu-dropdownicon />
	<nu-popuplistbox multiple>
		<nu-input outline="none"><input bind:value={search} /></nu-input>
		{#each countries.sort((a, b) => {
			if (a.toLowerCase() == search.toLowerCase()) {
				return 1
			} else if (b.toLowerCase() == search.toLowerCase()) {
				return 0
			} else if (a.substr(0, search.length).toUpperCase() == search.toUpperCase()) {
				return -1
			} else if (b.substr(0, search.length).toUpperCase() == search.toUpperCase()) {
				return 1
			} else {
				return 0
			}
		}) as country, index}
			<nu-option
				fill="auto :focus[special-bg] :current[outline] :pressed[special-bg] :current:pressed[special-bg]"
				on:keydown={(e) => {
					search = e.detail
				}}
				value={country}
			>
				{country}
			</nu-option>
		{/each}
	</nu-popuplistbox>
</nu-btn>

<h2>Autocomplete</h2>

<p>Start typing:</p>

<!--Make sure the form has the autocomplete function switched off:-->
<form autocomplete="off" action="/action_page.php">
	<div class="autocomplete" style="width:300px;">
		<input
			on:keydown={searchKeyDown}
			bind:this={searchInput}
			bind:value={search}
			on:focus={(e) => {
				show = true
			}}
			id="myInput"
			type="text"
			name="myCountry"
			placeholder="Country"
		/>
		{#if show}
			<div bind:this={listDiv} id="myInputautocomplete-list" class="autocomplete-items">
				{#each countries
					.filter((ct) => ct.substr(0, search.length).toUpperCase() == search.toUpperCase())
					.splice(0, 11) as country, index}
					<nu-flex class:autocomplete-active={index == currentFocus} on:click={(e) => handleSelect(e, country)}>
						<strong> {country.substr(0, search.length)} </strong>
						{country.substr(search.length)}
						<input type="hidden" value={country} />
					</nu-flex>
				{/each}
			</div>
		{/if}
	</div>
	<input type="submit" />
</form>

<!--<style ✂prettier:content✂="CgkqIHsKCQlib3gtc2l6aW5nOiBib3JkZXItYm94OwoJfQoKCWJvZHkgewoJCWZvbnQ6IDE2cHggQXJpYWw7Cgl9CgoJLyp0aGUgY29udGFpbmVyIG11c3QgYmUgcG9zaXRpb25lZCByZWxhdGl2ZToqLwoJLmF1dG9jb21wbGV0ZSB7CgkJcG9zaXRpb246IHJlbGF0aXZlOwoJCWRpc3BsYXk6IGlubGluZS1ibG9jazsKCX0KCglpbnB1dCB7CgkJYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7CgkJYmFja2dyb3VuZC1jb2xvcjogI2YxZjFmMTsKCQlwYWRkaW5nOiAxMHB4OwoJCWZvbnQtc2l6ZTogMTZweDsKCX0KCglpbnB1dFt0eXBlPSd0ZXh0J10gewoJCWJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7CgkJd2lkdGg6IDEwMCU7Cgl9CgoJaW5wdXRbdHlwZT0nc3VibWl0J10gewoJCWJhY2tncm91bmQtY29sb3I6IERvZGdlckJsdWU7CgkJY29sb3I6ICNmZmY7CgkJY3Vyc29yOiBwb2ludGVyOwoJfQoKCS5hdXRvY29tcGxldGUtaXRlbXMgewoJCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCQlib3JkZXI6IDFweCBzb2xpZCAjZDRkNGQ0OwoJCWJvcmRlci1ib3R0b206IG5vbmU7CgkJYm9yZGVyLXRvcDogbm9uZTsKCQl6LWluZGV4OiA5OTsKCQkvKnBvc2l0aW9uIHRoZSBhdXRvY29tcGxldGUgaXRlbXMgdG8gYmUgdGhlIHNhbWUgd2lkdGggYXMgdGhlIGNvbnRhaW5lcjoqLwoJCXRvcDogMTAwJTsKCQlsZWZ0OiAwOwoJCXJpZ2h0OiAwOwoJfQoKCS5hdXRvY29tcGxldGUtaXRlbXMgZGl2IHsKCQlwYWRkaW5nOiAxMHB4OwoJCWN1cnNvcjogcG9pbnRlcjsKCQliYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOwoJCWJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDRkNGQ0OwoJfQoKCS8qd2hlbiBob3ZlcmluZyBhbiBpdGVtOiovCgkuYXV0b2NvbXBsZXRlLWl0ZW1zIGRpdjpob3ZlciB7CgkJYmFja2dyb3VuZC1jb2xvcjogI2U5ZTllOTsKCX0KCgkvKndoZW4gbmF2aWdhdGluZyB0aHJvdWdoIHRoZSBpdGVtcyB1c2luZyB0aGUgYXJyb3cga2V5czoqLwoJLmF1dG9jb21wbGV0ZS1hY3RpdmUgewoJCWJhY2tncm91bmQtY29sb3I6IERvZGdlckJsdWUgIWltcG9ydGFudDsKCQljb2xvcjogI2ZmZmZmZjsKCX0K" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂=""></style>-->
<script>
	let searchInput
	let listDiv
	let search = ''
	let currentFocus: any = -1
	let show = false

	const searchKeyDown = (e) => {
		var x = listDiv
		if (x) x = x.getElementsByTagName('nu-flex')
		if (!listDiv) {
			show = true
			return
		}
		if (e.keyCode == 40) {
			if (currentFocus >= listDiv.childElementCount - 1) {
				currentFocus = 0
			} else {
				currentFocus++
			}
		} else if (e.keyCode == 38) {
			if (currentFocus <= 0) {
				currentFocus = listDiv.childElementCount - 1
			} else {
				currentFocus--
			}
		} else if (e.keyCode == 13) {
			e.preventDefault()
			if (currentFocus > -1) {
				if (x) x[currentFocus].click()
				show = false
			}
		}
	}
	const handleSelect = (e, value) => {
		searchInput.value = value
		show = false
	}
	document.addEventListener('click', function (e) {
		if (e.target != searchInput) {
			show = false
		}
	})

	/*An array containing all the country names in the world:*/
	var countries = [
		'Afghanistan',
		'Albania',
		'Algeria',
		'Andorra',
		'Angola',
		'Anguilla',
		'Antigua & Barbuda',
		'Argentina',
		'Armenia',
		'Aruba',
		'Australia',
		'Austria',
		'Azerbaijan',
		'Bahamas',
		'Bahrain',
		'Bangladesh',
		'Barbados',
		'Belarus',
		'Belgium',
		'Belize',
		'Benin',
		'Bermuda',
		'Bhutan',
		'Bolivia',
		'Bosnia & Herzegovina',
		'Botswana',
		'Brazil',
		'British Virgin Islands',
		'Brunei',
		'Bulgaria',
		'Burkina Faso',
		'Burundi',
		'Cambodia',
		'Cameroon',
		'Canada',
		'Cape Verde',
		'Cayman Islands',
		'Central Arfrican Republic',
		'Chad',
		'Chile',
		'China',
		'Colombia',
		'Congo',
		'Cook Islands',
		'Costa Rica',
		'Cote D Ivoire',
		'Croatia',
		'Cuba',
		'Curacao',
		'Cyprus',
		'Czech Republic',
		'Denmark',
		'Djibouti',
		'Dominica',
		'Dominican Republic',
		'Ecuador',
		'Egypt',
		'El Salvador',
		'Equatorial Guinea',
		'Eritrea',
		'Estonia',
		'Ethiopia',
		'Falkland Islands',
		'Faroe Islands',
		'Fiji',
		'Finland',
		'France',
		'French Polynesia',
		'French West Indies',
		'Gabon',
		'Gambia',
		'Georgia',
		'Germany',
		'Ghana',
		'Gibraltar',
		'Greece',
		'Greenland',
		'Grenada',
		'Guam',
		'Guatemala',
		'Guernsey',
		'Guinea',
		'Guinea Bissau',
		'Guyana',
		'Haiti',
		'Honduras',
		'Hong Kong',
		'Hungary',
		'Iceland',
		'India',
		'Indonesia',
		'Iran',
		'Iraq',
		'Ireland',
		'Isle of Man',
		'Israel',
		'Italy',
		'Jamaica',
		'Japan',
		'Jersey',
		'Jordan',
		'Kazakhstan',
		'Kenya',
		'Kiribati',
		'Kosovo',
		'Kuwait',
		'Kyrgyzstan',
		'Laos',
		'Latvia',
		'Lebanon',
		'Lesotho',
		'Liberia',
		'Libya',
		'Liechtenstein',
		'Lithuania',
		'Luxembourg',
		'Macau',
		'Macedonia',
		'Madagascar',
		'Malawi',
		'Malaysia',
		'Maldives',
		'Mali',
		'Malta',
		'Marshall Islands',
		'Mauritania',
		'Mauritius',
		'Mexico',
		'Micronesia',
		'Moldova',
		'Monaco',
		'Mongolia',
		'Montenegro',
		'Montserrat',
		'Morocco',
		'Mozambique',
		'Myanmar',
		'Namibia',
		'Nauro',
		'Nepal',
		'Netherlands',
		'Netherlands Antilles',
		'New Caledonia',
		'New Zealand',
		'Nicaragua',
		'Niger',
		'Nigeria',
		'North Korea',
		'Norway',
		'Oman',
		'Pakistan',
		'Palau',
		'Palestine',
		'Panama',
		'Papua New Guinea',
		'Paraguay',
		'Peru',
		'Philippines',
		'Poland',
		'Portugal',
		'Puerto Rico',
		'Qatar',
		'Reunion',
		'Romania',
		'Russia',
		'Rwanda',
		'Saint Pierre & Miquelon',
		'Samoa',
		'San Marino',
		'Sao Tome and Principe',
		'Saudi Arabia',
		'Senegal',
		'Serbia',
		'Seychelles',
		'Sierra Leone',
		'Singapore',
		'Slovakia',
		'Slovenia',
		'Solomon Islands',
		'Somalia',
		'South Africa',
		'South Korea',
		'South Sudan',
		'Spain',
		'Sri Lanka',
		'St Kitts & Nevis',
		'St Lucia',
		'St Vincent',
		'Sudan',
		'Suriname',
		'Swaziland',
		'Sweden',
		'Switzerland',
		'Syria',
		'Taiwan',
		'Tajikistan',
		'Tanzania',
		'Thailand',
		"Timor L'Este",
		'Togo',
		'Tonga',
		'Trinidad & Tobago',
		'Tunisia',
		'Turkey',
		'Turkmenistan',
		'Turks & Caicos',
		'Tuvalu',
		'Uganda',
		'Ukraine',
		'United Arab Emirates',
		'United Kingdom',
		'United States of America',
		'Uruguay',
		'Uzbekistan',
		'Vanuatu',
		'Vatican City',
		'Venezuela',
		'Vietnam',
		'Virgin Islands (US)',
		'Yemen',
		'Zambia',
		'Zimbabwe',
	]

	/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
</script>
