document.getElementById('submit_search').addEventListener("click", (e) => {
    var search_form = document.forms.search_form;

    let form = new FormData(search_form);
    
    console.log(form);
    console.log("clicked")

    var listing_div = document.getElementById('search_results')

    async function postJSON(data) {

        try{
            const response = await fetch ("http://localhost:8080/listings?zipcode="+form.get('zipcode')+"&city="+form.get('city')+"&state="+form.get('state')+"&purchase_type="+form.get('purchase_type')+"&username=null", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const result = await response.json()

            let number_verified = 0

            if (listing_div.firstChild) {
                while(listing_div.firstChild) {
                    listing_div.removeChild(listing_div.firstChild)
                }

            }

            if (result.length == 0) {
                /* Created verified listings and unverified listings header*/
                let ver_header = document.createElement('h2')
                ver_header.innerHTML = "Listings Found:"
                listing_div.append(ver_header)
                let v = document.createElement('h3')
                v.innerHTML = "No listings were found matching your search criteria"
                listing_div.append(v)

            } 
    
            else{

                let ver_header = document.createElement('h2')
                ver_header.innerHTML = "Listings Found:"
                listing_div.append(ver_header)

                for (let i = 0; i < result.length; i++){

                    let new_div = document.createElement("div")
                    new_div.classList.add('listing')
                    let street = document.createElement("h3")
                    let city = document.createElement("h3")
                    let state = document.createElement("h3")
                    let zipcode = document.createElement("h3")
                    let building_type = document.createElement("h3")
                    let price = document.createElement("h3")
                    let availability = document.createElement("h3")
                    let rooms = document.createElement("h3")
                    let description = document.createElement("h3")
                    let purchase_type = document.createElement("h3")
    
                    
                    let verified_status = result[i].verified_status
    
                    street.innerHTML = "Street: " + result[i].street_address
                    city.innerHTML = "City: " + result[i].city
                    state.innerHTML = "State: " + result[i].state
                    zipcode.innerHTML = "Zipcode: " + result[i].zipcode
                    building_type.innerHTML = "Building Type: " + result[i].building_type
                    price.innerHTML = "Price: $" + result[i].price
                    availability.innerHTML = "Availability: " + ((result[i].availability == 1 ? "Available" : "Unavailable"))
                    rooms.innerHTML = "Rooms: " + result[i].rooms
                    description.innerHTML = "Description: " + result[i].description
                    purchase_type.innerHTML = "Purchase Type: " + result[i].purchase_type
                    
    
                    new_div.append(street)
                    new_div.append(city)
                    new_div.append(state)
                    new_div.append(zipcode)
                    new_div.append(purchase_type)
                    new_div.append(building_type)
                    new_div.append(price)
                    new_div.append(availability)
                    new_div.append(rooms)
                    new_div.append(description)
    
                    if (verified_status == 1) {
                        listing_div.append(new_div)
                        number_verified++
                    }


                }

                if(number_verified == 0){
                    let v = document.createElement('h3')
                    v.innerHTML = "No verified listings found"
                    listing_div.append(v)
                }
            }
        }

        catch (err) {
            console.log("Error: " + err)
        }

    }
    postJSON(form)

})