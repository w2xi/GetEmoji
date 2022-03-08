export function buildSorter(on, sort = 'ASC'){
  sort = sort.toUpperCase()

  return function(a, b){
    if ( sort !== 'ASC' ){
      return b[on] - a[on]
    } else {
      return a[on] - b[on]
    }
  }
}