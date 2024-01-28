var TableauTestMode = true;
var CSVTabSplitter = true;
var IngestFile = false;

var conversationList = []
var conversationCounter = 0;
var currentConversationIndex = -1;
var datasources = [
    {
        // name: 'a',
        // full_doc_id: 2
        // summary_doc_id: 3
    }
]

var $conversationTitle = $('#conversation-title');
var $conversationList = $('#conversation-list');
var $newConversationButton = $('#new-conversation');
var $messages = $('#messages');
var $sendButton = $('#send');
var $messageInput = $('#message-input');
var $loading = $('#loading');
var $datasourcesSelect = $('#datasources-select');
var $sourceTypeOptionSummary = $('#radio-datasource-summary')
var $sourceTypeOptionFull = $('#radio-datasource-full')
var $convDatasoureName = $('#datasource-name');

var fixedApiUrl = API_URL.replace(/\/+$/, '') + '/v1'
var ChatCompletionUrl = fixedApiUrl + '/chat/completions'
var IngestTextUrl = fixedApiUrl + '/ingest/text'
var IngestFileUrl = fixedApiUrl + '/ingest/file'

function addNewConversation() {
    const id = ++conversationCounter;
    conversationList.push({
        id,
        name: `Conversation ${conversationCounter}`,
        messages: [
            {
                role: 'system',
                content: SYSTEM_PROMPT
            },
        ],
        datasource: {
            index: -1,
            type: 'summary'
        }
    })

    setCurrentConversationIndex(conversationList.length - 1);
    renderConversationList()
}

function setCurrentConversationIndex(index) {
    currentConversationIndex = index

    const conv = conversationList[index];

    // change title
    $conversationTitle.text(conv.name)
    // change datasource
    $datasourcesSelect.val(conv.datasource.index || 'none')
    $('#radio-datasource-' + conv.datasource.type).click()
    // change messages
    renderConverationMessages(conv)
}

function findConversationIndexById(id) {
    for (let i = 0; i < conversationList.length; i++) {
        if (conversationList[i].id == id) {
            return i
        }
    }
    return -1
}

function renderConversationList() {
    const ChatIcon = `<svg class="w-4 h-4 min-w-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 10.5h0m-4 0h0m-4 0h0M5 5h14c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1h-6.6a1 1 0 0 0-.7.3L8.8 19c-.3.3-.8 0-.8-.4V17c0-.6-.4-1-1-1H5a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"/>
</svg>`
    $conversationList.html('')
    conversationList.map(conv => {
        const $edit = $('<button>', {
            class: 'inline-flex items-center p-1 mr-0 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200',
            html: `<svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2"/>
          </svg>`
        }).click((e) => {
            e.stopPropagation()
            const $parent = $(e.target).closest('div')
            const onClickEdit = (e) => {
                e.stopPropagation()
                const input = $(e.target).closest('div').find('input')[0]
                const text = $(input).val()
                if (!text) return
                conversationList[findConversationIndexById(conv.id)].name = text
                renderConversationList()
            }
            $parent.html('')
            $parent.closest('li').removeClass('cursor-pointer')
            $parent.closest('li').off('click')
            $parent.append([
                ChatIcon,
                $('<input>', {
                    class: 'w-full mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block p-1',
                    placeholder: 'Conversation Name',
                    required: true,
                    value: conv.name,
                }).keydown(function (event) {
                    if (event.keyCode === 13) {
                        onClickEdit(event)
                    }
                }),
                $('<button>', {
                    class: 'inline-flex items-center p-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none',
                    html: `<svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12 4.7 4.5 9.3-9"/>
                  </svg>`
                }).click(onClickEdit),
                $('<button>', {
                    class: 'inline-flex items-center p-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200',
                    html: `<svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"/>
                  </svg>`
                }).click((e) => {
                    e.stopPropagation()
                    renderConversationList()
                })
            ])
        })
        const $remove = $('<button>', {
            class: 'inline-flex items-center p-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200',
            html: `<svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
          </svg>`
        }).click((e) => {
            e.stopPropagation()
            const index = findConversationIndexById(conv.id)
            conversationList.splice(index, 1)
            $(e.target).closest('li').remove()
            if (conversationList.length == 0) {
                addNewConversation()
            } else {
                if (currentConversationIndex == index) {
                    setCurrentConversationIndex(0)
                }
            }
        })
        $conversationList.append(
            $('<li>', { class: 'text-sm cursor-pointer' }).append([
                $('<div>', {
                    class: "flex px-1 py-1 items-center rounded-sm text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group",
                }).append([
                    ChatIcon,
                    $('<span>', {
                        class: "mx-1 truncate flex-1",
                        text: conv.name
                    }),
                    $edit,
                    $remove,
                ])
            ]).click(() => setCurrentConversationIndex(findConversationIndexById(conv.id)))
        )
    })
}

function renderConverationMessages(conv) {
    $messages.html('')
    conv.messages.map(message => {
        $messages.append(makeMessageElement(message))
    })
}

function makeMessageElement(message) {
    if (message.role == 'user') {
        return $('<div>', {
            class: 'flex ml-4 mb-1 justify-end max-w-100 message'
        }).append(
            $('<div>', {
                class: 'p-1 px-2 rounded-md bg-gray-100 rounded-tr-none text',
                text: message.content
            })
        )
    } else if (message.role == 'assistant') {
        return $('<div>', {
            class: 'max-w-100 mr-4 mb-1 justify-start flex message'
        }).append(
            $('<div>', {
                class: 'p-1 px-2 rounded-md bg-sky-50 rounded-tl-none text',
                text: message.content
            })
        )
    }
}

function addNewMessage(message) {
    const conv = conversationList[currentConversationIndex]
    conv.messages.push(message)
    $messages.append(makeMessageElement(message))
}

function sendMessage() {
    const new_message = $messageInput.val()
    $messageInput.val('')

    if (!new_message) return

    addNewMessage({
        role: 'user',
        content: new_message,
    })

    setLoading(true)

    const conv = conversationList[currentConversationIndex]
    const doc_id = conv.datasource.index >= 0 && datasources[conv.datasource.index][conv.datasource.type + '_doc_id']
    const contextParams = doc_id ? {
        "use_context": true,
        "context_filter": {
            "docs_ids": [
                doc_id
            ]
        },
        "include_sources": false,
    } : {}

    let lastResponseLength = false;
    $.ajax({
        url: ChatCompletionUrl,
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        data: JSON.stringify({
            messages: conv.messages,
            ...contextParams,
            stream: true
        }),
        xhrFields: {
            onprogress: function (e) {
                let progressResponse;
                const response = e.currentTarget.response;
                if (lastResponseLength === false) {
                    progressResponse = response;
                    lastResponseLength = response.length;
                }
                else {
                    progressResponse = response.substring(lastResponseLength);
                    lastResponseLength = response.length;
                }

                const chunks = progressResponse.split('data: ')
                for (let chunk of chunks) {
                    chunk = chunk.trim()
                    if (!chunk) continue
                    if (chunk == '[DONE]') {
                        setLoading(false)
                    } else {
                        chunk = JSON.parse(chunk)
                        const answer = chunk.choices[0].delta.content
                        addAssistantChunk(answer)
                    }
                }
            }
        }
    });
}

function addAssistantChunk(chunk) {
    const messages = conversationList[currentConversationIndex].messages
    if (messages.length == 0 || messages[messages.length - 1].role == 'user') {
        addNewMessage({
            role: 'assistant',
            content: chunk
        })
    } else {
        messages[messages.length - 1].content += chunk
        $('#messages .message:last-child .text').append(chunk)
    }
}

function setLoading(loading) {
    if (loading) {
        $loading.removeClass('hidden')
    } else {
        $loading.addClass('hidden')
    }
    $sendButton.prop('disabled', loading)
}

function initDatasources() {
    getTableauSheetNames().then(names => {
        datasources = names.map(name => ({ name }))
        renderDatasourceSelect()
    })
}

function renderDatasourceSelect() {
    datasources.map((datasource, index) => {
        $datasourcesSelect.append(
            $('<option>', {
                value: index,
                text: datasource.name
            })
        )
    })
}

function changeConvDatasource(datasourceIndex, datasourceType) {
    const conv_datasource = conversationList[currentConversationIndex].datasource

    if (datasourceIndex) conv_datasource.index = datasourceIndex
    if (datasourceType) conv_datasource.type = datasourceType

    if (conv_datasource.index < 0) return

    const datasource = datasources[conv_datasource.index];
    $convDatasoureName.html(datasource.name + ' - ' + conv_datasource.type)

    if (datasource[conv_datasource.type + '_doc_id']) return

    setLoading(true)
    getTableauSheetData(datasource.name, conv_datasource.type).then(data => {
        let ajaxRequest;
        if (IngestFile) {
            const blob = new Blob([data], { type: 'text/plain' });
            const formData = new FormData();
            formData.append('file', blob, datasource.name + '_' + conv_datasource.type + '.csv');

            ajaxRequest = $.ajax({
                url: IngestFileUrl,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
            })
        } else {
            ajaxRequest = $.ajax({
                url: IngestTextUrl,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                data: JSON.stringify({
                    file_name: datasource.name + '_' + conv_datasource.type + '.csv',
                    text: data
                })
            })
        }

        ajaxRequest.then(resp => {
            const doc_id = resp.data[0].doc_id
            datasource[conv_datasource.type + '_doc_id'] = doc_id
            setLoading(false)
        })
    })
}

function init() {
    $newConversationButton.click(addNewConversation)
    $sendButton.click(sendMessage)
    $messageInput.keydown(function (event) {
        if (event.keyCode === 13) {
            sendMessage()
        }
    });
    $sourceTypeOptionSummary.click(() => changeConvDatasource(null, 'summary'))
    $sourceTypeOptionFull.click(() => changeConvDatasource(null, 'full'))
    $datasourcesSelect.change(e => changeConvDatasource(e.target.value, 'summary'))

    initDatasources()

    addNewConversation()
}

function getTableauSheetNames() {
    return new Promise((resolve, reject) => {
        if (TableauTestMode) resolve(['Apple', 'Banana', 'Cat'])
        tableau.extensions.initializeAsync().then(function () {
            const sheets = [];
            tableau.extensions.dashboardContent.dashboard.worksheets.map(function (worksheet, index) {
                sheets.push(worksheet.name)
            })
            resolve(sheets)
        })
    })
}

function getTableauSheetData(sheetName, type) {
    return new Promise((resolve, reject) => {
        if (TableauTestMode) resolve('type,price\napple,100\nbear,200\ncat,300')
        tableau.extensions.initializeAsync().then(() => {
            const dashboard = tableau.extensions.dashboardContent.dashboard
            for (const worksheet of dashboard.worksheets) {
                if (worksheet.name == sheetName) {
                    if (type == 'full') {
                        worksheet.getDataSourcesAsync().then(datasource => {
                            datasource[0].getLogicalTablesAsync().then(logicalTable => {
                                datasource[0].getLogicalTableDataAsync(logicalTable[0].id).then(data => {
                                    resolve(convertTableauTableToCSVData(data))
                                    return
                                })
                            })
                        })
                    } else {
                        worksheet.getSummaryDataAsync().then(data => {
                            resolve(convertTableauTableToCSVData(data))
                            return
                        })
                    }
                }
            }
        })
    })
}

function convertTableauTableToCSVData(tableData) {
    const columns = tableData.columns.map(col => col.fieldName)
    const data = tableData.data.map(row => row.map(cell => cell.value))
    const totalData = [columns, ...data]
    const wrapCell = (cell) => {
        if (CSVTabSplitter) return cell;
        if (!cell) return ''
        return typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell
    }
    const text = totalData.map(row => row.map(wrapCell).join(CSVTabSplitter ? '\t' : ',')).join('\n')
    return text
}


$(document).ready(init)
