var tokenizatorAddress = "0x6a190eef45f589373a463AFb3B90493E696c45e2";

var web3js = new Web3();

var etherscanPrefix = "api";
let params = (new URL(document.location)).searchParams;
var tokenId = params.get('tid');
var net = params.get('net') || 1;

function getOwnerOf(tokenId) {
  var params = $.param({
      module: 'proxy',
      action: 'eth_call',
      tag: 'latest',
      to: tokenizatorAddress,
      data: '0x6352211e000000000000000000000000000000000000000000000000000000000000000'+tokenId,
      apikey: '5FUHMWGH51JT3G9EARU4K4QH3SVWYIMFIB',
  });
  return $.get('https://'+etherscanPrefix+'.etherscan.io/api?' + params);
}

function getTokenMetadata(tokenId) {
  var params = $.param({
      module: 'proxy',
      action: 'eth_call',
      tag: 'latest',
      to: tokenizatorAddress,
      data: '0x6914db60000000000000000000000000000000000000000000000000000000000000000'+tokenId,
      apikey: '5FUHMWGH51JT3G9EARU4K4QH3SVWYIMFIB',
  });
  return $.get('https://'+etherscanPrefix+'.etherscan.io/api?' + params);
}


function loadToken(tokenId) {
  function remove_non_ascii(str) {
    if ((str===null) || (str===''))
      return false;
   else
     str = str.toString();
    return str.replace(/[^\x20-\x7E]/g, '');
  }
  getTokenMetadata(tokenId).then(function(response) {
    var name = web3js.toAscii( response.result.substring(2,66));
    var creator = '0x'+response.result.substring(154,194);
    var desc = web3js.toAscii(response.result.substring(386).split('00000000000000000000000000000000000000000000000000000000000000')[0]);
    var srcImg = web3js.toAscii(response.result.substring(386)).replace(desc, '').substring(38);
    srcImg = remove_non_ascii(srcImg);
    desc = remove_non_ascii(desc);
    name = remove_non_ascii(name);
    $("#tokenName").text(name);
    $("#tokenImage").html("<img src=\""+srcImg+"\" width=64 height=64>");
    $("#tokenDesc").text(desc);
    $("#tokenCreator").text("Creator: "+creator);
  });

  getOwnerOf(tokenId).then(function(response) {
    $("#tokenOwner").text("Owner: 0x"+response.result.substring(26));
  });
}

window.addEventListener("load", function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== "undefined") {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
    $('#tokenActions').show();
    if (net == 3) {
      tokenizatorAddress = "0x5251F45C90D79112388993EbC45d9583A060f9F5";
      etherscanPrefix = "ropsten";
      web3js.setProvider(new web3js.providers.HttpProvider('https://ropsten.infura.io/WKNyJ0kClh8Ao5LdmO7z'));
    } else {
      web3js.setProvider(new web3js.providers.HttpProvider('https://mainnet.infura.io/WKNyJ0kClh8Ao5LdmO7z'));
    }
    loadToken(tokenId);
  } else {
    console.log("No web3? You should consider trying MetaMask!");
    var web3js = new Web3();
    $('#tokensColum').attr('class', 'col-md-8');
    if (net == 3) {
      tokenizatorAddress = "0x5251F45C90D79112388993EbC45d9583A060f9F5";
      etherscanPrefix = "ropsten";
      web3js.setProvider(new web3js.providers.HttpProvider('https://ropsten.infura.io/WKNyJ0kClh8Ao5LdmO7z'));
    } else {
      web3js.setProvider(new web3js.providers.HttpProvider('https://mainnet.infura.io/WKNyJ0kClh8Ao5LdmO7z'));
    }
    loadToken(tokenId);
  }
});
