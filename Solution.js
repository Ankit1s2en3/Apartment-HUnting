
function createStructure(blocks,reqs){
  //reqsXblocks Matrix representation
  var reqs_blocks = new Array(reqs.length)
  reqs.forEach((ele,idx)=>{
    reqs_blocks[idx] = new Array(blocks.length)
  })

  for(var i =0; i<reqs_blocks.length; i++){
    for(var j =0;j<reqs_blocks[i].length;j++){
      if (blocks[j][reqs[i]])
        reqs_blocks[i][j] = true
      else
        reqs_blocks[i][j] = false
    }
  }

  return reqs_blocks
}

//finding next true value at right side
function rightIdx(current_block,blocks){
  for( var i = current_block+1; i<blocks.length; i++){
      if(blocks[i])
        return i
  }
  //if right index is not there, return biggest number
  return Number.MAX_VALUE
}

function getDistance(blocks){
  nearest_distance = []
  //points at left and right true position
  var left_true = Number.MAX_VALUE
  var right_true = 0
  //tu sum the difference
  var diff_left = 0
  var diff_right = 0

  for(var i =0;i<blocks.length;i++){
    console.log('idx : '+i)
    if(blocks[i]){
      left_true = i
      nearest_distance.push(0)
    }

    if(i >= right_true && right_true < blocks.length){
      right_true = rightIdx(i,blocks)
      console.log('found right at : '+right_true)
    }

    if(!blocks[i]){
      diff_left = Math.abs(left_true - i)
      diff_right = Math.abs(right_true - i)
      var min = Math.min(diff_left,diff_right)
      console.log('pushing min : '+min)
      nearest_distance.push(min)
    }

  }

  return nearest_distance

}


//sum of distance of each block with it's request
function sumDistance(req_blocks_dis){
  var sum_reqs = []
  
  for(var i =0; i<req_blocks_dis[0].length;i++){
    var sum = 0
    for(var j =0; j<req_blocks_dis.length;j++){
      sum += req_blocks_dis[j][i]
    }
    
    sum_reqs.push(sum)
  }

  return sum_reqs
}

//iterating through each block and checking it's distance with respect to other points
function min_dist(min_index,req_blocks_dis){
  //storing relative distance sum
  var distances = []
  min_index.forEach((val,idx)=>{
    var sum = 0
    for(var i = 1; i<req_blocks_dis.length; i++){
      var x = req_blocks_dis[i][val]
      var y = req_blocks_dis[0][val]
      sum += Math.abs( x - y ) 
    }
    distances.push(sum)
  })

  //finding minimum relative distance and it's index
  const min = distances.reduce((a,b)=> Math.min(a,b))
  const min_idx = distances.indexOf(min)
  //returning original index
  return min_index[min_idx]
}

//main function
function apartmentHunting(blocks, reqs) {
  //storing transpose matrix
  var reqs_blocks = createStructure(blocks,reqs)
  //storing distance of matrix
  var req_blocks_dis = []
  var min_index = []

  //list of distance for each block per request
  reqs.forEach((ele,idx)=>{
    var blocks = getDistance(reqs_blocks[idx])
    req_blocks_dis.push(blocks)
  })

  //sum of distance to it's requests for each block
  var sum_arr = sumDistance(req_blocks_dis)
  
  //get minimum distance and it can contain multiple minimum distances
  const min = sum_arr.reduce( (a, b) => Math.min(a,b))

  //storing indexes of minimum distance blocks
  sum_arr.forEach((val,idx)=>{
    if( val == min)
        min_index.push(idx)
    })
    
  //returning minimum distance index
  if (min_index.length == 1)
        return min_index[0]
  else 
        return min_dist(min_index,req_blocks_dis) //if contains multiple minimum distances, we need to find relatively closest points to each other
  }

exports.apartmentHunting = apartmentHunting;