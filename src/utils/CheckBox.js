import React, { useEffect, useState } from "react"
import Checkbox from "expo-checkbox"
import { Text, View } from "react-native"

// data 양식
// [ { value: someting , isChecked: false }, ...]

const CheckBox = ({ style, data, updateValue, finish }) => {
  const [list, setList] = useState(data) // data 불러온것을 list에 저장
  const [value, setValue] = useState("")

  // finish를 받으면 데이터 초기화 즉, 체크표시 초기화 되도록 하기 위한 코드
  useEffect(() => {
    setList(data)
  }, [finish])

  // checkBoxShape의 item과 index는 선택한 요소의 정보만 나온다
  const checkBoxShape = (item, index) => {
    // 상태 변경이므로 map을 사용하는게 편하다
    const isSelected = () => {
      let newList = list.map((selected, idx) => {
        // 해당 하는 체크란이 나오면
        if (idx === index) {
          // 선택한거 값 지우기
          if (value === selected.value) {
            setValue("")
            updateValue("")
          } else {
            setValue(selected.value)
            updateValue(selected.value)
          }
          // 선택한거 다시 선택하면 체크란 비우기
          return { ...selected, isChecked: !selected.isChecked }
        }
        // 체크란에 하나만 체크할 수 있도록 만들었다
        // 만약 여렇게 하고싶으면 return selected
        return { ...selected, isChecked: false }
      })
      setList(newList)
    }

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }} key={index}>
        <Checkbox value={item.isChecked} onChange={isSelected} />
        <Text>{item.value}</Text>
      </View>
    )
  }

  return (
    <View style={style}>
      {/* flatlist, scrollview 모두 복합으로 쓰면 virtual warning이 뜰 수 있어 그냥 map으로 통일 */}
      {list &&
        list.length > 0 &&
        list.map((item, index) => checkBoxShape(item, index))}
    </View>
  )
}

export default CheckBox
