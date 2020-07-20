import { GRAPHIC_DATA, GRAPHIC_DATA_ERROR } from "./dataInterface";

export function processData(text: string): GRAPHIC_DATA[]|GRAPHIC_DATA_ERROR|null {
    let grapic_plot: GRAPHIC_DATA[];
    let text_split = text.split('\n');
    let parsed_json: any;
    let line_number: number;
    let timestamp = undefined, begin_timestamp = undefined, end_timestamp = undefined;
    let span_timestamp = undefined;
    let min_response_time = undefined, max_response_time = undefined;
    let group_os = undefined, group_browser = undefined;

    if (text_split.length)
        return null;

    line_number = 0;

    for (let line of text_split) {
        line_number++;

        if (line.trim() === "")
            continue;

        try {
            parsed_json = JSON.parse(line);
        } catch (e) {
            return {error: -1, reason: `Error parsing JSON at line ${line_number} with message ${e.message}`}
        }

        if (!parsed_json.type)
            return {error: -2, reason: `Missing type at line ${line_number}`}

        if (parsed_json.type === 'span') {

            if (timestamp === undefined)
                return {error: -19, reason: `You must begin command with type: 'start'`};
            // To do later ...

        } else if (parsed_json.type === 'start') {
            
            if (!parsed_json.timestamp)
                return {error: -3, reason: `Missing timestamp at line ${line_number}`};

            if (timestamp !== undefined)
                return {error: -4, reason: `Redefinition of start timestamp at line ${line_number}. Start timestamp already defined`};
            
            if (isNaN(parsed_json.timestamp))
                return {error: -5, reason: `Timestamp at line ${line_number} is NaN`};
            
            timestamp = parsed_json.timestamp;

            if (!parsed_json.select)
                return {error: -5, reason: `Missing 'select' at line ${line_number}`};

            if (typeof(parsed_json.select) !== 'object')
                return {error: -6, reason: `'select' at line ${line_number} is not an object`};
            
            if (parsed_json.select.length !== 2)
                return {error: -7, reason: `Wrong 'select' length at line ${line_number}`};

            min_response_time = parsed_json.select[0];

            if (typeof(min_response_time) !== 'string')
                return {error: -8, reason: `'select' element 0 is not an string. Error at line ${line_number}`};

            min_response_time = min_response_time.trim();

            if (!min_response_time.length)
                return {error: -9, reason: `'select' element 0 is empty string. Error at line ${line_number}`};

            max_response_time = parsed_json.select[1];

            if (typeof(max_response_time) !== 'string')
            return {error: -10, reason: `'select' element 1 is not an string. Error at line ${line_number}`};

            max_response_time = max_response_time.trim();

            if (!max_response_time.length)
                return {error: -11, reason: `'select' element 1 is empty string. Error at line ${line_number}`};
            
            if (!parsed_json.group)
                return {error: -12, reason: `Missing 'group' at line ${line_number}`};
            
            if (typeof(parsed_json.group) !== 'object')
                return {error: -13, reason: `Wrong 'group' type at line ${line_number}`};
            
            if (parsed_json.group.length !== 2)
                return {error: -14, reason: `Wrong group length at line ${line_number}`};

            group_os = parsed_json.group[0];
        
            if (typeof(group_os) !== 'string')
                return {error: -15, reason: `'group' element 0 is not string. Error at line ${line_number}`};
        
            group_os = group_os.trim();

            if (!group_os.length)
                return {error: -16, reason: `'group' element 0 is empty string. Error at line ${line_number}`};
            
            group_browser = parsed_json.group[1];
    
            if (typeof(group_browser) !== 'string')
                return {error: -17, reason: `'group' element 1 is not string. Error at line ${line_number}`};
        
            group_browser = group_browser.trim();
        
            if (!group_browser.length)
                return {error: -18, reason: `'group' element 1 is empty string. Error at line ${line_number}`};

        }
    }
    return null;
}
