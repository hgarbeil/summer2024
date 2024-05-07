
let regionNum = 0 ;
let zoomNum = 10 ;
let regions =['Wash-Indianola','Wash-Olympia','Oregon-Eugene','Chicago'] ;
let regionName = regions[regionNum] ;
const mainEl = document.querySelector('.main-content') ;
// const selectedText = document.querySelector('.selected')
const titleEl = document.querySelector('h1.logo');
let cent_coords = [[47.7470, -122.5257],[47.0379, -122.9007],[44.0521, -123.0868],[41.8781, -87.6298]] ;
let map ;
var tableEl = document.createElement('table') ;
tableEl.classList.add ('content-table') ;
var theadEl = document.createElement("thead");
var tbodyEl = document.createElement("tbody");
let activFile = "data/Wash_activ.txt";


let markerOptions = {
    title: "1",
    clickable : true ,
    draggable: false ,

};

var homeIcon = L.icon({
    iconUrl: 'data/bed-bug.png',
    iconSize: [32,32]
});

var hikeIcon = L.icon({
    iconUrl: 'data/icons8-hiking-50.png',
    iconSize: [32,32]
});

var townIcon = L.icon({
    iconUrl: 'data/icons8-town-24.png',
    iconSize: [32,32]
});


function loadArea (id){
    
    regionNum = id ;
    if (regionNum==0){
        activFile = "data/Wash_activ.txt"
    }
    if (regionNum==1){
        activFile = "data/olympia_activ.txt"
    }
    if (regionNum==2){
        activFile = "data/eugene_activ.txt"
    }
    if (regionNum==3){
        activFile = "data/chicago_activ.txt"
    }
    regionName = regions[id];
    // selectedText.innerHTML = regionName ;
    titleEl.innerHTML = "Summer 2024 :  "+regionName ;
    console.log (id+"  : "+activFile);
    loadMap(regionNum) ;
    loadTable();
}

function loadMap (regionNumber){
    if (regionNumber==2) {
        zoomNum = 14 ;
    }
    else zoomNum = 12 ;
    if (map != undefined) { map.remove(); } 
    map = L.map('mapid').setView(cent_coords[regionNumber], zoomNum);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}


function loadTable (){
    console.log("opening "+activFile);
    theadEl.innerHTML="" ;
    tbodyEl.innerHTML="" ;
    $ajaxUtils.sendGetRequest (activFile, function(responseText){
        console.log(responseText);
        var lines = responseText.split('\n');
        const firstline = lines.shift () ;
        //console.log[lines];
        var heads = firstline.split(",");
        var myTr = document.createElement ("tr") ;
        myTr.classList.add ('tr-head') ;  
        for (var i=0; i<heads.length; i++) {
            var myTh = document.createElement ("th") ;
            if (i==1 || i==4 || i==5){
                myTh.classList.add("priority-low") ;
            }
            myTh.innerHTML = heads[i] ;
            myTr.appendChild (myTh) ;
        }
        theadEl.appendChild (myTr) ;
        
        // console.log("number of hikes is "+lines.length);
        
        //for (var iline =0; iline<lines.length-1; iline++){
        for (var iline =0; iline<lines.length; iline++){
            myTr = document.createElement ("tr") ;
            var cells = lines[iline].split(",") ;
            console.log(lines[iline]);
            // console.log(cells[0]);
            // create object and add to myhikes
            let hike={
                "id" : iline ,
                "name" : cells[0] ,
                "latitude" : cells[2],
                "longitude" : cells[3] ,
    
            }
            // console.log(iline + "  " + hike.name+ "  "+cells[8]) ;
            markerOptions.title = iline ;
            markerOptions.icon = homeIcon ;
            if (cells[1]=='Hike'){
                markerOptions.icon = hikeIcon ;
            }
            if (cells[1]=='Town'){
                markerOptions.icon = townIcon ;
            }
            var marker = L.marker([cells[2],cells[3]],markerOptions)
            marker.bindPopup("<b>"+cells[0]+"</b>").openPopup();
            marker.addTo(map) ;
            
            marker.on ("click",function(event){
                //clickedMarker (event.target.options.title);
                
                //highlightRow (event.target.options.title) ;
            }); 
            //myhikes.push (hike) ;
            
    
            for (i=0; i<6; i++) {
                // console.log(heads[i]);
                var myTd = document.createElement ("td") ;
                if (i==1 || i==2|| i==3){
                    myTd.classList.add("priority-low") ;
                }
                if (i==5){
                    // console.log(cells[i]);
                    var link = '<a target="_blank" href='+cells[i]+'>Website</a>' ;
                    myTd.innerHTML = link ;
                }
                else if (i==7){
                    var link = '<a target="_blank" href='+cells[i]+'>Map</a>' ;
                    myTd.innerHTML = link ;
                }
                else {
                    myTd.innerHTML = cells[i] ;
                }
                myTr.appendChild (myTd) ;
                
            }
            tbodyEl.appendChild (myTr) ;
    
        }
        tableEl.appendChild(tbodyEl) ;
    //    myhikes = lines ;
    
    
    
        
        
        
    },false);


    } ;
    


mainEl.innerHTML=`
<div id="mapid" class="mapdiv"></div>`;
loadMap(regionNum) ;
loadTable() ;




mainEl.appendChild (tableEl) ;
tableEl.appendChild (theadEl) ;




