window.onload = function () {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendMessage(tab.id, {type: "poruka"});

    });
}

chrome.extension.onMessage.addListener(function (message) {
    if (message.type != 'poruka') {

        console.log('došla');

        query = message.query;

        getAndCreate(query);

    }
})

    function getAndCreate(query) {

        console.log(query);

        polje = [];

        $.ajax({
            url: 'https://evening-journey-37500.herokuapp.com/njuskaloScraper?query=' + query, //promijeniti url u url gdje će biti hostan API + query
            method: 'GET'
        }).then(function (data) {
            data.forEach(function (element) {


                polje.push(element);
            })

            polje.sort(function(a, b){
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                else return 0;
            });

            polje.forEach(function(element){
                console.log(data);

                container = document.getElementById('cont');

                offerCount = document.getElementById('offerCount');
                offerCount.innerHTML="Pronašli smo " + data.length + " sličnih oglasa za Vas:";

                divOffer = document.createElement('a');
                divOffer.classList.add('divA');
                divOffer.setAttribute('href', element.url); //Dodati url: element.url
                divOffer.setAttribute('target', '_blank')
                container.appendChild(divOffer);

                divImg = document.createElement('div');
                divImg.classList.add('divImg');
                divOffer.appendChild(divImg);

                Img = document.createElement('img');
                Img.classList.add('imgSlika');
                Img.setAttribute('src', 'http:'+ element.imgUrl) //dodati url slike element.imgUrl
                divImg.appendChild(Img);

                divDetails = document.createElement('div');
                divDetails.classList.add('offDetails');
                divOffer.appendChild(divDetails);

                h1 = document.createElement('h1');
                h1.innerHTML = element.title; //dodati naslov elementa: element.title
                h1.classList.add('offHeading');
                divDetails.appendChild(h1);

                p1 = document.createElement('p');
                p1.innerHTML = element.price; //dodati cijenu elementa: element.price
                p1.classList.add('offP1');
                divDetails.appendChild(p1);

                p2 = document.createElement('p');
                p2.innerHTML = element.description; //opcionalno - dodati cijenu elementa u eurima: element.priceEur
                p2.classList.add('offP2');
                divDetails.appendChild(p2);

            })
        });

    }
