// initiating global variables
var currentPrice = 0
var globalPrice = 0
// add necessary elements to '.cart'
$('<p class = "clearText">Please, add something</p>').appendTo('.cart')
$('<div class = "item"></div>').appendTo('.cart')
$('<div class = "boxPrice"></div>').appendTo('.cart')
$('<div class = "tax"></div>').appendTo('.boxPrice')
$('<div class = "price"></div>"').appendTo('.boxPrice')
$('<button class = "send" data-toggle="modal" data-target="#myModal" hidden>Send order</button>').appendTo('.cart')

//initializing '.btn' click function
$('.btn').on('click', function() {
	// hide text and show price/taxes + send button
	$('.tax').removeAttr('hidden')
	$('.price').removeAttr('hidden')
	$('.send').removeAttr('hidden')
	$('.clearText').attr('hidden', 'hidden')
	// initializing necessary variables
	let	btnClicked = $(this)[0]
	btnClicked.disabled = true
	let prodName = $(this)[0].parentNode.getElementsByTagName('h2')[0]
	let prodPrice = $(this)[0].parentNode.getElementsByTagName('p')[1]
	$(prodName).clone().appendTo('.item')
	$(prodPrice).clone().appendTo('.item')
  // formula for calculating price and taxes
	currentPrice = Number($(prodPrice).text().split('$').join(''))
	globalPrice += currentPrice 
	$('.tax').text("Tax 10%: "+(globalPrice*0.1).toFixed(2)+"$")
	$('.price').text("Total Price: "+(globalPrice+(globalPrice*0.1)).toFixed(2)+("$")+"(tax included)")
	//add Total Price to modal window
	$('.totalPrice').text("Total Price: " + (globalPrice+(globalPrice*0.1)).toFixed(2)+("$")+" "+"(tax included)")
	// add plus, minus, remove buttons and input
	$('<button class="plus">+</button>').on('click', function() { //start calculating price and taxes
		$(this).next().next()[0].value = ++($(this).next().next()[0].value)
		currentPrice = Number($(prodPrice).text().split('$').join(''))
		globalPrice += currentPrice
		$('.tax').text("Tax 10%: " + (globalPrice*0.1).toFixed(2)+"$")
		$('.price').text("Total Price: " + (globalPrice+(globalPrice*0.1)).toFixed(2)+("$")+"(tax included)")
		$('.totalPrice').text("Total Price: " + (globalPrice+(globalPrice*0.1)).toFixed(2)+("$")+" "+"(tax included)")
		// unlock '.minus', when it's more than 1
		if ($(this).next().next()[0].value >= 1) { 
			$(this).next()[0].disabled = false
		}
	}).appendTo('.item')

	$('<button class="minus" disabled>-</button>').on('click', function() { 
		if ($(this).next()[0].value == 2) { // lock '.minus' button, when it's 1
			$(this)[0].disabled = true
		}
		// start calculating price and taxes
		$(this).next()[0].value = --($(this).next()[0].value)
		currentPrice = Number($(prodPrice).text().split('$').join(''))
		globalPrice -= currentPrice
		$('.tax').text("Tax 10%: " + (globalPrice*0.1).toFixed(2)+"$")
		$('.price').text("Total Price: " + (globalPrice+(globalPrice*0.1)).toFixed(2)+("$")+"(tax included)")
		$('.totalPrice').text("Total Price: " + (globalPrice+(globalPrice*0.1)).toFixed(2)+("$")+" "+"(tax included)")
	}).appendTo('.item')
	
	$('<input class="stack" value="1" disabled="disabled"></input>').appendTo('.item') // add input

	$('<button class = "remove">x</button>').on('click', function(){
		// start calculating price and taxes
		currentPrice = Number($(prodPrice).text().split('$').join(''))
		globalPrice -= currentPrice * $(this).prev()[0].value
		$('.tax').text("Tax 10%: " + (globalPrice*0.1).toFixed(2)+"$")		
		$('.price').text("Total Price: " + (globalPrice+(globalPrice*0.1)).toFixed(2)+("$")+"(tax included)")
		$('.totalPrice').text("Total Price: " + (globalPrice+(globalPrice*0.1)).toFixed(2)+("$")+" "+"(tax included)")
		// start delete items
		$(this).prev().prev().prev().prev().prev().remove() //delete </h2>
		$(this).prev().prev().prev().prev().remove() // delete </p>	
		$(this).prev().prev().prev().remove() // delete '.plus'
		$(this).prev().prev().remove() // delete '.minus'
		$(this).prev().remove() // delete '.stack'
		$(this).remove()// delete '.remove'
		btnClicked.disabled = false // unlock 'Add' button
		if ( $('.remove').length < 1 ) { // hide price and taxes, and show '.clearText'
			$('.tax').attr('hidden', 'hidden')
			$('.price').attr('hidden', 'hidden')
			$('.send').attr('hidden', 'hidden')			
			$('.clearText').removeAttr('hidden')
		}
	}).appendTo('.item')
}) // '.btn click'

//set settings for modal window	
$('#myModal').modal({
	keyboard : false,
	backdrop : "static",
	show : false
})

$('.formSend').on('click',function () { //cheking fields
	if( $('.name')[0].value && $('.phone')[0].value && $('.email')[0].value !== "") {
		alert('Thanks, your order was complited!')
		$('.formClose').click()
		$('.remove').click()
	} else {
		$('.modal-title').text('Please, fill all fields')
		$('.name')[0].value == "" ? $('.name').animate({top : "-=10px"}, 150).animate({top : "+=15px"}, 150).animate({top : "-=5px"}, 150) : false
		$('.phone')[0].value == "" ? $('.phone').animate({top : "-=10px"}, 150).animate({top : "+=15px"}, 150).animate({top : "-=5px"}, 150) : false
		$('.email')[0].value == "" ? $('.email').animate({top : "-=10px"}, 150).animate({top : "+=15px"}, 150).animate({top : "-=5px"}, 150) : false
	}
})
