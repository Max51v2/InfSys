let run=1;
let doAnimationData = 0
let doAnimationDXDiag = 0
compteurStatic = 0
dataStoragePast=0
dataStorageAct=0
let doRefresh=0

async function Loading() {
    const url = 'http://127.0.0.1:3000/PowerAutomateState.txt';
    fetch(url)
        .then(response => response.text('utf-8'))
        .then(data => {
            if (data === "Creating DXDiag") {
                doAnimationDXDiag = 1
            }
            if (data === "Generating data") {
                doAnimationData = 1
            }
            if (data === "Done") {
                run = 0;
            }
        })
        .catch(error => console.error('Erreur:', error)
    );
    await fetch
        if(doRefresh === 1){
            //Supression du contenu de la page
            doRefresh=0
            document.getElementById("Second_Header").style.display='block';
            location.reload()
        }
        if (doAnimationDXDiag === 1){
            LoadingAnimationDXDiag();
            await Wait(750);
            doAnimationDXDiag = 0
        }

        if (doAnimationData === 1){
            LoadingAnimationData();
            await Wait(750);
            doAnimationData = 0
        }

        if (run === 1) {
            await Wait(100);
            await Loading();
        }
        else{
            document.getElementById("Second_Header").style.display='none';
            DiplayData();
        }

}


async function DiplayData() {
    //Récupération des informations statiques
    document.getElementById("Main_Header").innerHTML = "";
    DisplayStatic();

    //Récupération des informations dynamiques
    DisplayDynamic();
}


//Statistiques statiques
async function DisplayStatic() {
    const url = 'http://127.0.0.1:3000/InfStatic.txt';
    fetch(url)        
        .then(response => response.text('utf-8'))
        .then(data => {
            //Retrait du message du Statut
            document.getElementById("Main_Header").style.display='none'

            //Affichage du tableau
            document.getElementById("PC").style.display='block';
            document.getElementById("CPU").style.display='block';
            document.getElementById("GPU").style.display='block';
            document.getElementById("RAM").style.display='block';
            document.getElementById("Storage").style.display='block';
            document.getElementById("Screen").style.display='block';

            //Récupperation des valeurs
            size = 0
            var inputArray = data.split('\n');
            inputArray.forEach(element => ArraySize(element))
            FillStatic(inputArray)
        })
        .catch(error => console.error('Erreur:', error));
}


//Statistiques dynamiques
async function DisplayDynamic() {
        //CPU
        const url = 'http://127.0.0.1:3000/InfDynamicCPU.txt';
        fetch(url)
        .then(response => response.text('utf-8'))
        .then(data => {
            //Récupperation des valeurs
            var inputArray = data.split('\n');
            CompteurDynamic=0
            size = 0
            inputArray.forEach(element => ArraySize(element))
            FillDynamicCPU(inputArray)
        })
        .catch(error => console.error('Erreur:', error));

        //GPU
        const url2 = 'http://127.0.0.1:3000/InfDynamicGPU.txt';
        fetch(url2)
        .then(response => response.text('utf-8'))
        .then(data => {
            //Récupperation des valeurs
            var inputArray = data.split('\n');
            CompteurDynamic=0
            size = 0
            inputArray.forEach(element => ArraySize(element))
            FillDynamicGPU(inputArray)
        })
        .catch(error => console.error('Erreur:', error));

            //RAM
            const url3 = 'http://127.0.0.1:3000/InfDynamicRAM.txt';
            fetch(url3)
            .then(response => response.text('utf-8'))
            .then(data => {
            //Récupperation des valeurs
            var inputArray = data.split('\n');
            CompteurDynamic=0
            size = 0
            inputArray.forEach(element => ArraySize(element))
            FillDynamicRAM(inputArray)
        })
            .catch(error => console.error('Erreur:', error));
            //Stockage
            const url4 = 'http://127.0.0.1:3000/InfDynamicStorage.txt';
            fetch(url4)
            .then(response => response.text('utf-8'))
            .then(data => {
            //Récupperation des valeurs
            var inputArray = data.split('\n');
            CompteurDynamic=0
            size = 0
            inputArray.forEach(element => ArraySize(element))

            FillDynamicStorage(inputArray)
        })
        .catch(error => console.error('Erreur:', error));

        await Wait(100)

        //Actualisation
    while( 1 === 1){
        //CPU
        const url = 'http://127.0.0.1:3000/InfDynamicCPU.txt';
        fetch(url)
            .then(response => response.text('utf-8'))
            .then(data => {
                //Récupperation des valeurs
                var inputArray = data.split('\n');
                CompteurDynamic=0
                size = 0
                inputArray.forEach(element => ArraySize(element))
                FillDynamicCPU2(inputArray)
            })
            .catch(error => console.error('Erreur:', error));

        //GPU
        const url2 = 'http://127.0.0.1:3000/InfDynamicGPU.txt';
        fetch(url2)
            .then(response => response.text('utf-8'))
            .then(data => {
                //Récupperation des valeurs
                var inputArray = data.split('\n');
                CompteurDynamic=0
                size = 0
                inputArray.forEach(element => ArraySize(element))
                FillDynamicGPU2(inputArray)
            })
            .catch(error => console.error('Erreur:', error));

        //RAM
        const url3 = 'http://127.0.0.1:3000/InfDynamicRAM.txt';
        fetch(url3)
            .then(response => response.text('utf-8'))
            .then(data => {
                //Récupperation des valeurs
                var inputArray = data.split('\n');
                CompteurDynamic=0
                size = 0
                inputArray.forEach(element => ArraySize(element))
                FillDynamicRAM2(inputArray)
            })
            .catch(error => console.error('Erreur:', error));
        //Stockage
        const url4 = 'http://127.0.0.1:3000/InfDynamicStorage.txt';
        fetch(url4)
            .then(response => response.text('utf-8'))
            .then(data => {
                //Récupperation des valeurs
                var inputArray = data.split('\n');
                CompteurDynamic=0
                size = 0
                inputArray.forEach(element => ArraySize(element))

                FillDynamicStorage2(inputArray)
            })
            .catch(error => console.error('Erreur:', error));

        //On vérifie s'il fat recharger la page
        const url5 = 'http://127.0.0.1:3000/PowerAutomateState.txt';
        fetch(url5)
            .then(response => response.text('utf-8'))
            .then(data => {
                if (data === "Creating DXDiag") {
                    Refresh()
                }
                if (data === "Generating data") {
                    Refresh()
                }
            })
            .catch(error => console.error('Erreur:', error));

            await Wait(100)
    }
}



//Fonctions
//Fonction pause
function Wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//Animation chargement DXDiag
async function LoadingAnimationDXDiag(){
    document.getElementById("Main_Header").innerHTML = "Création d'un rapport DXDiag.&nbsp;&nbsp;";
    await Wait(250);
    document.getElementById("Main_Header").innerHTML = "Création d'un rapport DXDiag..&nbsp;";
    await Wait(250);
    document.getElementById("Main_Header").innerHTML = "Création d'un rapport DXDiag...";
    await Wait(250);
}


//Animation Chargement PowerShell
async function LoadingAnimationData(){
    document.getElementById("Main_Header").innerHTML = "Execution des scripts PowerShell.&nbsp;&nbsp;";
    await Wait(250);
    document.getElementById("Main_Header").innerHTML = "Execution des scripts PowerShell..&nbsp;";
    await Wait(250);
    document.getElementById("Main_Header").innerHTML = "Execution des scripts PowerShell...";
    await Wait(250);
}


async function ArraySize(element){
    size += 1
}


async function FillStatic(inputArray){
    while(compteurStatic < size-1){

        if(compteurStatic === 3){
            document.getElementById(compteurStatic+1).innerHTML="<a href=\"https://www.techpowerup.com/cpu-specs/#"+inputArray[compteurStatic]+"\">"+inputArray[compteurStatic]+"</a>"
        }
        if(compteurStatic === 6){
            document.getElementById(compteurStatic+1).innerHTML="<a href=\"https://www.techpowerup.com/gpu-specs/#"+inputArray[compteurStatic]+"\">"+inputArray[compteurStatic]+"</a>"
        }
        if(compteurStatic != 3 & compteurStatic != 6){
            document.getElementById(compteurStatic+1).innerHTML=inputArray[compteurStatic]
        }

        compteurStatic += 1
    }
}




//Remplissage stats dynamiques une première fois
//CPU
    async function FillDynamicCPU(inputArray){
    while(CompteurDynamic < size-1){

        if(CompteurDynamic === 0){
            var table = document.getElementById("CPU");
            var tr = document.createElement("tr");
            tr.id="41"+CompteurDynamic
            table.appendChild(tr);

            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            th1.innerHTML = "<p>Fréquence Actuelle :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            th1.id="21"+CompteurDynamic+"1"
            th2.id="21"+CompteurDynamic+"2"
            tr.appendChild(th1);
            tr.appendChild(th2);
        }
        
        if(CompteurDynamic === 1){
            var table = document.getElementById("CPU");
            var tr = document.createElement("tr");
            tr.id="41"+CompteurDynamic
            table.appendChild(tr);

            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            th1.innerHTML = "<p>Utilisation :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            th1.id="21"+CompteurDynamic+"1"
            th2.id="21"+CompteurDynamic+"2"
            tr.appendChild(th1);
            tr.appendChild(th2);
        }

    CompteurDynamic += 1
    }
}

//GPU
async function FillDynamicGPU(inputArray){
    while(CompteurDynamic < size-1){

        if(CompteurDynamic === 0){
            var table = document.getElementById("GPU");
            var tr = document.createElement("tr");
            tr.id="42"+CompteurDynamic
            table.appendChild(tr);

            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            th1.innerHTML = "<p>VRAM utilisée :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            th1.id="22"+CompteurDynamic+"1"
            th2.id="22"+CompteurDynamic+"2"
            tr.appendChild(th1);
            tr.appendChild(th2);
        }
        
        if(CompteurDynamic === 1){
            var table = document.getElementById("GPU");
            var tr = document.createElement("tr");
            tr.id="42"+CompteurDynamic
            table.appendChild(tr);

            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            th1.innerHTML = "<p>Utilisation :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            th1.id="22"+CompteurDynamic+"1"
            th2.id="22"+CompteurDynamic+"2"
            tr.appendChild(th1);
            tr.appendChild(th2);
        }

    CompteurDynamic += 1
    }
}

//RAM
async function FillDynamicRAM(inputArray){
    while(CompteurDynamic < size-1){

        if(CompteurDynamic < size-2){
            var table = document.getElementById("RAM");
            var tr = document.createElement("tr");
            tr.id="43"+CompteurDynamic
            table.appendChild(tr);

            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            th1.innerHTML = "<p>DIMM :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            th1.id="23"+CompteurDynamic+"1"
            th2.id="23"+CompteurDynamic+"2"
            th2.style.width="600px"
            tr.appendChild(th1);
            tr.appendChild(th2);
        }
        
        if(CompteurDynamic === size-2){
            var table = document.getElementById("RAM");
            var tr = document.createElement("tr");
            tr.id="43"+CompteurDynamic
            table.appendChild(tr);

            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            th1.innerHTML = "<p>Utilisation :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            th1.id="23"+CompteurDynamic+"1"
            th2.id="23"+CompteurDynamic+"2"
            tr.appendChild(th1);
            tr.appendChild(th2);
        }
    CompteurDynamic += 1
    }
}

//Stockage
async function FillDynamicStorage(inputArray){
    while(CompteurDynamic < size-1){

        if(CompteurDynamic%2 === 0){
            var table = document.getElementById("Storage");
            var tr = document.createElement("tr");
            tr.id="44"+CompteurDynamic
            table.appendChild(tr);

            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            th1.innerHTML = "<p>Lecteur n°"+((CompteurDynamic/2)+1)+":</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            th1.id="24"+CompteurDynamic+"1"
            th2.id="24"+CompteurDynamic+"2"
            tr.appendChild(th1);
            tr.appendChild(th2);
        }

        if(CompteurDynamic%2 === 1){
            var table = document.getElementById("Storage");
            var tr = document.createElement("tr");
            tr.id="44"+CompteurDynamic
            table.appendChild(tr);

            var th1 = document.createElement("th");
            var th2 = document.createElement("th");
            th1.innerHTML = "<p>Utilisation :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            th1.id="24"+CompteurDynamic+"1"
            th2.id="24"+CompteurDynamic+"2"
            tr.appendChild(th1);
            tr.appendChild(th2);
        }

    CompteurDynamic += 1
    }
}



//Remplissage stats dynamiques à l'infini
//CPU
async function FillDynamicCPU2(inputArray){
    while(CompteurDynamic < size-1){

        if(CompteurDynamic === 0){
            var tr = document.getElementById("41"+CompteurDynamic)
            var th1 = document.getElementById("21"+CompteurDynamic+"1")
            var th2 = document.getElementById("21"+CompteurDynamic+"2")
            th1.innerHTML = "<p>Fréquence Actuelle :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            tr.appendChild(th1);
            tr.appendChild(th2);
        }
        
        if(CompteurDynamic === 1){
            var tr = document.getElementById("41"+CompteurDynamic)
            var th1 = document.getElementById("21"+CompteurDynamic+"1")
            var th2 = document.getElementById("21"+CompteurDynamic+"2")
            th1.innerHTML = "<p>Utilisation :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            tr.appendChild(th1);
            tr.appendChild(th2);
        }

    CompteurDynamic += 1
    }
}

//GPU
async function FillDynamicGPU2(inputArray){
    while(CompteurDynamic < size-1){

        if(CompteurDynamic === 0){
            var tr = document.getElementById("42"+CompteurDynamic)
            var th1 = document.getElementById("22"+CompteurDynamic+"1")
            var th2 = document.getElementById("22"+CompteurDynamic+"2")
            th1.innerHTML = "<p>VRAM utilisée :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            tr.appendChild(th1);
            tr.appendChild(th2);
        }
        
        if(CompteurDynamic === 1){
            var tr = document.getElementById("42"+CompteurDynamic)
            var th1 = document.getElementById("22"+CompteurDynamic+"1")
            var th2 = document.getElementById("22"+CompteurDynamic+"2")
            th1.innerHTML = "<p>Utilisation :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            tr.appendChild(th1);
            tr.appendChild(th2);
        }

    CompteurDynamic += 1
    }
}

//RAM
async function FillDynamicRAM2(inputArray){
    while(CompteurDynamic < size-1){

        if(CompteurDynamic < size-2){
            var tr = document.getElementById("43"+CompteurDynamic)
            var th1 = document.getElementById("23"+CompteurDynamic+"1")
            var th2 = document.getElementById("23"+CompteurDynamic+"2")
            th1.innerHTML = "<p>DIMM :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            tr.appendChild(th1);
            tr.appendChild(th2);
        }
        
        if(CompteurDynamic === size-2){
            var tr = document.getElementById("43"+CompteurDynamic)
            var th1 = document.getElementById("23"+CompteurDynamic+"1")
            var th2 = document.getElementById("23"+CompteurDynamic+"2")
            th1.innerHTML = "<p>Utilisation :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            tr.appendChild(th1);
            tr.appendChild(th2);
        }
    CompteurDynamic += 1
    }
}

//Stockage
async function FillDynamicStorage2(inputArray){
    while(CompteurDynamic < size-1){

        if(CompteurDynamic%2 === 0){
            var tr = document.getElementById("44"+CompteurDynamic)
        var th1 = document.getElementById("24"+CompteurDynamic+"1")
        var th2 = document.getElementById("24"+CompteurDynamic+"2")
        th1.innerHTML = "<p>Lecteur n°"+((CompteurDynamic/2)+1)+":</p>";
        th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
        tr.appendChild(th1);
        tr.appendChild(th2);
        }
        
        if(CompteurDynamic%2 === 1){
            var tr = document.getElementById("44"+CompteurDynamic)
            var th1 = document.getElementById("24"+CompteurDynamic+"1")
            var th2 = document.getElementById("24"+CompteurDynamic+"2")
            th1.innerHTML = "<p>Utilisation :</p>";
            th2.innerHTML = "<p>"+inputArray[CompteurDynamic]+"</p>";
            tr.appendChild(th1);
            tr.appendChild(th2);
        }
        
    CompteurDynamic += 1
    }
}


//Recharge la page en cas de changement de nombre d'objets
async function Refresh(){
    //Masquage du tableau
    document.getElementById("PC").style.display='none';
    document.getElementById("CPU").style.display='none';
    document.getElementById("GPU").style.display='none';
    document.getElementById("RAM").style.display='none';
    document.getElementById("Storage").style.display='none';
    document.getElementById("Screen").style.display='none';

    //Affichage du message du Statut
    document.getElementById("Main_Header").style.display='block'

    //Récupération du statut
    run=1
    doRefresh=1
    Loading()
}


//DEMARRAGE
//on cache le tableau
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("PC").style.display='none';
    document.getElementById("CPU").style.display='none';
    document.getElementById("GPU").style.display='none';
    document.getElementById("RAM").style.display='none';
    document.getElementById("Storage").style.display='none';
    document.getElementById("Screen").style.display='none';
    document.getElementById("Second_Header").style.display='none';
});
Loading();