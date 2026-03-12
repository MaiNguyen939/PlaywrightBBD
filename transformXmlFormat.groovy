def processData(message) {
    def body = message.getBody(String)

    def inputXml = new XmlSlurper().parseText(body)
    def writer = new StringWriter()
    def builder = new groovy.xml.MarkupBuilder(writer)

    builder.doubleQuotes = true
    builder.mkp.xmlDeclaration(version: "1.0", encoding: "UTF-8")

    builder.Records {
        inputXml.Record.each { record ->
            def recordType = record.@Type.text()

            "$recordType" {
                record.Field.each { field ->
                    def fieldName = field.FieldName.@Value.text()
                    def fieldValue = field.FieldValue.@Value.text()

                    "$fieldName" {
                        mkp.yield(fieldValue)

                        if (field.FieldFormat.size() > 0) {
                            FieldFormat(Value: field.FieldFormat.@Value.text())
                        }
                        if (field.DateFormat.size() > 0) {
                            DateFormat(Value: field.DateFormat.@Value.text())
                        }
                    }
                }
            }
        }
    }

    message.setBody(writer.toString())
    return message
}
