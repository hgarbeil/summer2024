
let regionNum = 0 ;
let zoomNum = 10 ;
let regions =['Wash-Indianola','Wash-Olympia','Oregon-Eugene','Chicago','Toronto'] ;
let dates =['July 25 - Aug 12', 'Aug 15 - 18', 'Aug 12 - 15','Aug 21 - 28', 'Aug 28 - Sep 15'] ;
let zoomList = [10,10,14,12,13] ;
let regionName = regions[regionNum] ;
const mainEl = document.querySelector('.main-content') ;
// const selectedText = document.querySelector('.selected')
let cent_coords = [[47.7470, -122.5257],[47.0379, -122.9007],[44.0521, -123.0868],[41.8309286, -87.59272],
[43.6532,-79.3832]] ;
let map ;
var tableEl = document.createElement('table') ;
const titleEl = document.querySelector('h1.logo');
const dateEl = document.querySelector('#datefield') ;
tableEl.classList.add ('content-table') ;
var theadEl = document.createElement("thead");
var tbodyEl = document.createElement("tbody");

let activFile = "data/Wash_activ.txt";
let dateString = dates[0] ;


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
var parkIcon =  L.icon({
    iconUrl: 'data/icons8-park-50.png',
    iconSize: [32,32]
});
var schoolIcon =  L.icon({
    iconUrl: 'data/icons8-university-30.png',
    iconSize: [32,32]
});


function loadArea (id){
    
    regionNum = id ;
    zoomNum = zoomList[id] ;
    dateString = dates[id];
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
    if (regionNum==4){
        activFile = "data/toronto_activ.txt"
    }
    regionName = regions[id];
    // selectedText.innerHTML = regionName ;
    titleEl.innerHTML = "Summer 2024 :  "+regionName ;
    dateEl.innerHTML = dateString ;
    console.log (id+"  : "+activFile);
    loadMap(regionNum) ;
    loadTable();
}

function loadMap (regionNumber){
    
    if (map != undefined) { map.remove(); } 
    map = L.map('mapid').setView(cent_coords[regionNumber], zoomNum);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: zoomNum+10,
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
            if (cells[1]=='Park'){
                markerOptions.icon = parkIcon ;
            }
            if (cells[1]=='School'){
                markerOptions.icon = schoolIcon ;
            }
            // console.log(cells[2]+' Lon : '+cells[3])
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
loadArea(0);
loadMap(regionNum) ;
loadTable() ;




mainEl.appendChild (tableEl) ;
tableEl.appendChild (theadEl) ;




