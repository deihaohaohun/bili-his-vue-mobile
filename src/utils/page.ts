const usePage = () => {
  const p = reactive({
    page: 1,
    size: 10,
    noMore: false
  })

  function reset() {
    p.page = 1
    p.noMore = false
    return true
  }

  return { p, reset }
}

export { usePage }
