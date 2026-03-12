import groovy.xml.MarkupBuilder

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

                "${fieldName}"(fieldValue)
            }
        }
    }
}

message.setBody(writer.toString())
