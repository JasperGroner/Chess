class Serializer {
  static serialize(data, allowedAttributes) {
    const serializedData = {}

    for (const attribute of allowedAttributes) {
      serializedData[attribute] = data[attribute]
    }
    return serializedData
  }
}

export default Serializer