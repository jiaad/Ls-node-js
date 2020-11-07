#!/bin/bash


echo "Statrting"
mkdir manualTesting


echo "CREATING manualTesting/LIB"
mkdir manualTesting/lib


echo "Creating Naruto \n \n"
mkdir manualTesting/lib/Naruto
touch manualTesting/lib/Naruto/sasuke.js
touch manualTesting/lib/Naruto/sakura.js
touch manualTesting/lib/Naruto/hinata.js
touch manualTesting/lib/Naruto/shikamaru.js
echo "Creating DRAGON \n \n"

mkdir manualTesting/lib/Dragon
touch manualTesting/lib/Dragon/ball.js
touch manualTesting/lib/Dragon/super.js
touch manualTesting/lib/Dragon/heroes.js


echo "FILES \n \n"
touch manualTesting/lib/a.js
touch manualTesting/lib/AK.js
touch manualTesting/lib/.jiad
touch manualTesting/lib/.hidden

echo "FA \n \n"
mkdir manualTesting/fa
mkdir manualTesting/fa/cs
mkdir manualTesting/fa/ba
mkdir manualTesting/fa/lol

echo 'finished'

cd manualTesting/
$SHELL