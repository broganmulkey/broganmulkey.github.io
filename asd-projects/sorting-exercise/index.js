/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
// sorts all elements from smallest to largest and increases the swap counter
async function bubbleSort(array){
for(let i = 0; i <  array.length - 1; i++){         //runs throught the array
    for(let j = array.length -1; j > 1; j--){       // starts sorting through the array begginging at the end, and stops once it reaches the beggining 
        if(array[j].value < array[j - 1].value){    //if the current value is less than the previous the values get swapped
            swap(array, j, j -  1);                 //does the swapping
            updateCounter(bubbleCounter);           //updates the move count so that you can visual see the amount swapped
            await sleep();                          // pauses the program long enough so that you can see it get swapped
        }
    }
}
}

// TODO 3: Implement quickSort
 async function quickSort(array, left, right){    //creates function
    if(left >= right){                      //if the left index is smaller than the left then it stops sorting
        return;                             //returns functions

    }

    var index = await partition(array, left, right);       //divides into left and right
    if(left < index - 1){                                  // if the left is less than the index it runs the code block
        await quickSort(array, left, index - 1);           // recalls the quicksort fuction with the index being decreased by 1
    }
if (right > index){                                         //activates if the right side is greater than the index
    await quickSort(array, index, right);                   //recalls quicksort with the index as the left parameter
}

 }

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){                   //creates the partition function
    let pivot = array[Math.floor((right + left) / 2)].value;    //creating a variable caled pivot; finds pivot by finsing middle index of the array and dividing by 2
    while(left < right){                                        //activates while left is less than right
        while(array[left].value < pivot){                       //increases the left value while the left value is less than the pivot
            left++;
        }
        while(array[right].value > pivot){                      //decreases the right value while the right value is greater than the pivot
            right--;
        }
        if(left < right){                                       //activates if the left value is greater than the right
            swap(array, left, right);                           //swpas the left and right values
            updateCounter(quickCounter)                         //updates the counter for the quick sort
            await sleep();                                      //shows the animation frame by stopping the program in between switches
        }
    }


return left + 1;                                                //adds 1 to the left value
}

// TODO 1: Implement swap
function swap(array, i, j){
    var temp = array[i];            //stores array[i] in a temp variable
    array[i] = array[j];            //changes the value of array[i] to array [j]
    array[j] = temp;                // sets j equal to the orignial value array[i]
    drawSwap(array, i, j);          //the visual swap of the bubbles
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}