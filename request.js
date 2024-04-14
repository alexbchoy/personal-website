let asin = 'your_asin_value';

async function request(){
    const url = "https://real-time-amazon-data.p.rapidapi.com/product-details?asin="+ asin + "&country=US";
    console.log(url);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '060c728975msh44b737a0f8b7de0p104211jsn4412e49869d1',
            'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        update(result);
    } catch (error) {
        console.error(error);
    }
}

async function pullAsin(amazonLink){
    amazonLink = document.getElementById("amazonUrlInput").value;
    asin = 'your_asin_value';
    asin = amazonLink.substring(amazonLink.indexOf("dp/") + 3, amazonLink.indexOf("dp/") + 13);
    console.log(asin);
    request();
}

async function update(result){
    const product_title = result.data.product_title;
    const price = result.data.product_price;
    const rating = result.data.product_star_rating;
    const img = result.data.product_photo;

    if(result.data.product_original_price != null){
        calculateDiscount(result);
    }

    console.log('Product Title:', product_title);
    console.log('Price:', price);
    console.log('Ratings:', rating);
    console.log('Image:', img);

    document.getElementById("product-name").innerHTML = product_title;
    document.getElementById("price").innerHTML = price;
    if(rating != null){
        document.getElementById("rating").innerHTML = rating;
    }
    else{
        document.getElementById("rating").innerHTML = "N/A";
    }
    document.getElementById("image-frame").src = img;
    console.log("complete");
}

async function calculateDiscount(result){
    const orgPrice = parseFloat(result.data.product_original_price.replace("$", ""));
    const discPrice = parseFloat(result.data.product_price.replace("$", ""))
    const discRate = Math.round((orgPrice - discPrice) / orgPrice * 100);
    document.getElementById("discount").innerHTML = discRate + "%";
}
