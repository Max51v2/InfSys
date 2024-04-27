Clear-Host
cd C:\testPShell

#Suppression du fichier DXDiag
rm -ErrorAction Ignore DXdiag.txt

#Génération d'un rapport DXDiag afin de récupérer quelques informations sur le système
dxdiag /whql:on /t C:\testPShell/DXDiag
Clear-Host
$run=1
while ($run -eq 1) {
    Write-Host "Création DXDiag."
    start-sleep -seconds 0.4
    Clear-Host
    Write-Host "Création DXDiag.."
    start-sleep -seconds 0.4
    Clear-Host
    Write-Host "Création DXDiag..."
    start-sleep -seconds 0.4  
    Clear-Host
    $test=$(cat -ErrorAction Ignore .\DXDiag.txt | Select-String "System Information" | foreach { $_ -replace "`r|`n","" })
    if ($test -eq 'System Information') {
        $run=0
    }
}

Clear-Host
Write-Host "DXDiag créé"
start-sleep -seconds 0.2
Clear-Host

#Récupérations d'informations statiques
#nom de l'ordinateur
$ComputerName=$(Get-ComputerInfo | Select-Object -ExpandProperty "Csname")

#OS
$OS=$(Get-ComputerInfo | Select-Object -ExpandProperty "OsName")
$OS=$OS + " " + $(Get-ComputerInfo | Select-Object -ExpandProperty "OsArchitecture")

#nom d'utilisateur connecté
$User=$(Get-LocalUser | Where-Object { $_.Enabled -eq "True" }) 

#nom CPU
$CPU=$(Get-WmiObject Win32_Processor | Select-Object -ExpandProperty "Name") 

#fréquence CPU
$CPUFrequencyMax=$(Get-WmiObject Win32_Processor | Select-Object -ExpandProperty "MaxClockSpeed")

#nombre coeurs/threads
$CPUCores=$(Get-WmiObject Win32_Processor | Select-Object -ExpandProperty "NumberOfCores")
$CPUThreads=$(Get-WmiObject Win32_Processor | Select-Object -ExpandProperty "NumberOfLogicalProcessors")

#nom GPU
$GPUName=$(Get-CimInstance win32_VideoController | Select-Object -ExpandProperty "Name" -First 1)

#RAM
$CompteurRAM=0
$RAM=new-object system.collections.arraylist
$CapacityTotal=0
Get-WmiObject CIM_PhysicalMemory | foreach {
    $DIMM=$_.DeviceLocator
    $Manufacturer=$_.Manufacturer
    $SerialNumber=$_.SerialNumber
    $Capacity=$_.Capacity / [Math]::Pow(2, 30)
    $Speed=$_.Speed
    $CapacityTotal+=$Capacity

    [void]$RAM.Add("$DIMM : $Manufacturer (SN :$SerialNumber) $Capacity GB à $Speed MHz")
    $CompteurRAM+=1
}

#VRAM GPU
$VRAM=[math]::Round((cat C:\testPShell/DXDiag.txt | Select-String "Dedicated Memory" | Select-Object -First 1 | ForEach-Object { $_ -match '\d+' | Out-Null;if ($_ -notmatch "Dedicated Memory: n/a"){$Matches[0.1]}else{echo 1}})/[Math]::Pow(2, 10),2)
$VRAMShared=[math]::Round((cat C:\testPShell/DXDiag.txt | Select-String "Shared Memory" | Select-Object -First 1 | ForEach-Object { $_ -match '\d+' | Out-Null;if ($_ -notmatch "Shared Memory: n/a"){$Matches[0.1]}else{echo 1}})/[Math]::Pow(2, 10),2)

#affichage
$Screen=$(cat C:\testPShell/DXDiag.txt | Select-String "Current Mode" | ForEach-Object { $_ -match '(\d+\s*x\s*\d+)\s*\(\d+\s*bit\)\s*\(\d+Hz\)' | Out-Null; $Matches[0] })

#version drivers GPU
$GPUDrivers=$(cat C:\testPShell/DXDiag.txt | Select-String "Driver Version" | ForEach-Object { $_ -match '([\d+|\.]+)' | Out-Null; $Matches[0] } | Select-Object -First 1)

#sortie
$Output=$(cat C:\testPShell/DXDiag.txt | Select-String "Output Type" | ForEach-Object { $_ -match '(HDMI|DISPLAYPORT|VGA|DVI)' | Out-Null; $Matches[0] })

#Stockage
#Lettres
$b=0
$DriveLetters=new-object system.collections.arraylist
cat C:\testPShell/DXDiag.txt | Select-String -Pattern 'Drive: [A-Z]:' | foreach {$_ -split (" ") | foreach {if($b%8 -eq 7){[void]$DriveLetters.Add($_)}$b+=1}}
#Noms
$DriveNames=new-object system.collections.arraylist
[void]$DriveNames.Add("Disque local")
$CompteurName=1
get-wmiobject CIM_StorageVolume | Select-Object -ExpandProperty "Label" | ForEach-Object {$_ -match '([a-z]|[A-Z]|-|_)+' | Out-Null; $Matches[0]} | foreach {
    [void]$DriveNames.add($_)
    $CompteurName+=1
}
#Capacités
$DriveCapacity=new-object system.collections.arraylist
cat C:\testPShell/DXDiag.txt | Select-String "Total Space"| ForEach-Object { $_ -match '\d+[\.\d|]+' | Out-Null; $Matches[0]} | foreach {
    [void]$DriveCapacity.add($_)
}
#Capacités restante
$DriveCapacityLeft=new-object system.collections.arraylist
cat C:\testPShell/DXDiag.txt | Select-String "Free Space"| ForEach-Object { $_ -match '\d+[\.\d|]+' | Out-Null; $Matches[0]} | foreach {
    [void]$DriveCapacityLeft.add($_)
}
#pourcentage utilisation
$DriveCapacityPercentage=new-object system.collections.arraylist
$b=0
while ($b -lt $CompteurName) {
    [void]$DriveCapacityPercentage.add([Math]::Round(($DriveCapacityLeft[$b] / $DriveCapacity[$b])*100))
    $b+=1
}



#Impression des informations
while (1 -eq 1) {
    #Récupérations d'informations dynamiques
    #processeur
    $CPUUsage=(Get-WmiObject Win32_Processor | Select-Object -ExpandProperty "LoadPercentage")
    
    #Fréquence CPU
    $CPUFrequency=$(Get-WmiObject Win32_Processor | Select-Object -ExpandProperty "CurrentClockSpeed")

    #Ram libre
    $FreeCapacity=[math]::Round($(Get-WmiObject Win32_OperatingSystem | Select-Object -ExpandProperty "FreePhysicalMemory") / [Math]::Pow(2, 20),2)

    #VRAM Utilisée
    $VRAMUsed=[math]::Round((Get-Counter -counter "\GPU Adapter Memory(*)\Dedicated Usage" | Select-Object -ExpandProperty "CounterSamples" | Select-Object -ExpandProperty "CookedValue" -First 1)/[Math]::Pow(2, 30),2)
    $VRAMPercentage=[math]::Round(($VRAMUsed / $VRAM)*100,2) >$null	

    #Utilisation GPU
    $b=0
    get-wmiobject Win32_PerfFormattedData_GPUPerformanceCounters_GPUEngine | Select-Object -ExpandProperty "UtilizationPercentage" | foreach {$b+=$_}
    $GPUUtilization=$b


    #impression informations
    clear-Host
    Write-Host "Nom de l'ordinateur : $ComputerName"
    Write-Host "Nom de l'utilisateur : $User"
    Write-Host "Version OS : $OS"
    Write-host ""
    Write-Host "-------------CPU-------------"
    Write-Host "Modèle : $CPU"
    Write-Host "Utilisation CPU : $CPUUsage%"
    Write-Host "Nombre Coeurs/Thread : $CPUCores / $CPUThreads"
    Write-Host "Fréquence : $CPUFrequency MHz"
    Write-Host "Fréquence Max : $CPUFrequency MHz"
    Write-host ""
    Write-Host "-------------RAM-------------"
    $b=0
    while ($b -lt $CompteurRAM) {
        Write-host $RAM[$b]
        $b+=1
    }
    Write-host "RAM disponible : $FreeCapacity GB / $CapacityTotal GB"
    Write-Host ""
    Write-Host "-------------GPU-------------"
    Write-Host "Modèle : $GPUName"
    Write-Host "VRAM : $VRAM GB (+ $VRAMShared GB Partagé)"
    Write-Host "VRAM Utilisée : "$VRAMUsed" GB ("$VRAMPercentage"%)"
    Write-Host "Utilisation GPU : $GPUUtilization %"
    Write-Host "Version drivers : $GPUDrivers"
    Write-Host ""
    Write-Host "------------Ecran------------"
    Write-Host "Mode vidéo : $Screen"
    Write-Host "Sortie : $Output"
    Write-Host ""
    Write-Host "-----------Stockage----------"
    $b=0
    while ($b -lt $CompteurName) {
        Write-Host "Lecteur : "$DriveNames[$b]" ("$DriveLetters[$b]")"
        $DriveCapacityPercentage=[Math]::Round(($DriveCapacityLeft[$b] / $DriveCapacity[$b])*100)
        Write-Host "Capacité restante : "$DriveCapacityLeft[$b]" / "$DriveCapacity[$b]" ($DriveCapacityPercentage%)"
        $b+=1
    }
    start-sleep -seconds 0.05
}
