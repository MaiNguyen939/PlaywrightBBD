import java.io.InputStream

def ns0 = 'http://Microsoft.LobServices.Sap/2007/03/Idoc/3/ORDERS05//701/Send'
def ns1 = 'http://Microsoft.LobServices.Sap/2007/03/Types/Idoc/3/ORDERS05//701'
def ns2 = 'http://Microsoft.LobServices.Sap/2007/03/Types/Idoc/Common/'

def prefixMap = [
    (ns0): 'ns0',
    (ns1): 'ns1',
    (ns2): 'ns2'
]

def buildXml
buildXml = { node ->
    def uri = node.namespaceURI()
    def prefix = prefixMap[uri] ?: ''
    def tag = prefix ? "${prefix}:${node.name()}" : node.name()
    def children = node.children()

    def sb = new StringBuilder()
    sb.append("<${tag}")

    if (node.name() == 'Send') {
        prefixMap.each { nsUri, nsPrefix ->
            sb.append(" xmlns:${nsPrefix}=\"${nsUri}\"")
        }
    }

    if (children.size() == 0 && !node.text()) {
        sb.append("></${tag}>")
    } else if (children.every { it instanceof String } || children.size() == 0) {
        sb.append(">${node.text()}</${tag}>")
    } else {
        sb.append(">")
        children.each { child ->
            if (!(child instanceof String)) {
                sb.append(buildXml(child))
            }
        }
        sb.append("</${tag}>")
    }
    sb.toString()
}

for (int i = 0; i < dataContext.getDataCount(); i++) {
    InputStream is = dataContext.getStream(i)
    Properties props = dataContext.getProperties(i)

    def xml = new XmlSlurper().parse(is)
    def result = buildXml(xml)

    is = new ByteArrayInputStream(result.getBytes("UTF-8"))
    dataContext.storeStream(is, props)
}
