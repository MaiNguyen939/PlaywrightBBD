import groovy.xml.MarkupBuilder
import groovy.xml.XmlUtil

def processData(message) {
    def body = message.getBody(java.lang.String)

    def inputXml = new XmlSlurper().parseText(body)
    def writer = new StringWriter()
    def builder = new MarkupBuilder(writer)
    builder.setDoubleQuotes(true)

    builder.Records {
        inputXml.Record.each { record ->
            def recordType = record.@Type.text()

            "${recordType}" {
                record.Field.each { field ->
                    def fieldName  = field.FieldName.@Value.text()
                    def fieldValue = field.FieldValue.@Value.text()

                    "${fieldName}" {
                        mkp.yield(fieldValue)

                        field.children().each { child ->
                            def childName = child.name()
                            if (childName != "FieldName" && childName != "FieldValue") {
                                "${childName}"(Value: child.@Value.text())
                            }
                        }
                    }
                }
            }
        }
    }

    message.setBody(writer.toString())
    return message
}
