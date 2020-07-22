
import { GRAPHIC_DATA, GRAPHIC_DATA_ERROR } from "./dataInterface";

/** Configurable max number of graphics to plot */
const MAX_NUMBER_OF_GRAPHICS = 8;

/**
 * This function get all texts from CodemMirror editor and parse to GRAPHIC_DATA[] structure to send to nivo library graphics
 * 
 * It:
 * 1- Splits line numbers
 * 2- Parse each line to JSON
 * 3- Process each parameter in type sctructure
 * 4- Returns if success Graphic data in GRAPHIC_DATA structure
 * 
 * On error returns:
 *  GRAGRAPHIC_DATA_ERROR
 * 
 * Or null if no data is inserted in text
 */
export function processData(text: string): GRAPHIC_DATA[]|GRAPHIC_DATA_ERROR|null {
    let graphic_plot: GRAPHIC_DATA[] = [];
    let text_split = text.split('\n');
    let parsed_json: any;
    let line_number: number;
    let data_timestamp: number;
    let timestamp: any = undefined, begin_timestamp = undefined, end_timestamp = undefined;
    let stop_timestamp: any = undefined;
    let span_timestamp = undefined;
    let os_tmp: string, browser_tmp: string;
    let min_response_time: any = undefined, max_response_time: any = undefined;
    let group_os = undefined, group_browser = undefined;
    let min_response_tmp: any, max_response_tmp: any;
    let group_min_response_time_already_exists: boolean;
    let group_max_response_time_already_exists: boolean;

    if (!text_split.length)
        return null;

    line_number = 0;

    for (let line in text_split) {

        line_number++;

        if (text_split[line].trim() === "")
            continue;

        try {
            parsed_json = JSON.parse(text_split[line]);
        } catch (e) {
            return {error: -1, reason: `Error parsing JSON at line ${line_number} with message ${e.message}`}
        }

        if (!parsed_json.type)
            return {error: -2, reason: `Missing type at line ${line_number}`}

        if (parsed_json.type === 'data') {

            if (span_timestamp === undefined)
                continue;

            if (!parsed_json.timestamp)
                return {error: -28, reason: `Missing timestamp in 'data'. Error at line ${line_number}`};

            if (isNaN(parsed_json.timestamp))
                return {error: -29, reason: `timestamp in 'data' is NaN. Error at line ${line_number}`};

            if (parsed_json.timestamp>end_timestamp)
                continue;

            if (parsed_json.timestamp<begin_timestamp)
                continue;

            data_timestamp = parsed_json.timestamp;

            os_tmp = parsed_json[group_os as string];

            if (!os_tmp)
                return {error: -30, reason: `Missing ${group_os} in data at line ${line_number}`};
            
            if (typeof(os_tmp) !== 'string')
                return {error: -31, reason: `At line ${line_number} '${group_os}' is not a string`};

            os_tmp = os_tmp.trim();
        
            if (!os_tmp.length)
                return {error: -32, reason: `At line ${line_number} '${group_os}' has an empty string`};
            
            browser_tmp = parsed_json[group_browser as string];

            if (!browser_tmp)
                return {error: -33, reason: `Missing '${group_browser}' in data at line ${line_number}`};
        
            if (typeof(browser_tmp) !== 'string')
                return {error: -34, reason: `At line ${line_number} '${browser_tmp}' is not a string`};
            
            browser_tmp = browser_tmp.trim();

            if (!browser_tmp.length)
                return {error: -35, reason: `At line ${line_number} '${browser_tmp}' has an empty string`};

            min_response_tmp = parsed_json[min_response_time as string];

            if (!min_response_tmp)
                return {error: -36, reason: `At line ${line_number} '${min_response_time}' is not defined`};

            if (isNaN(min_response_tmp))
                return {error: -37, reason: `'${min_response_time}' is not a number`};

            max_response_tmp = parsed_json[max_response_time as string];

            if (!max_response_tmp)
                return {error: -38, reason: `At line ${line_number} '${max_response_time}' is not defined`};
            
            if (isNaN(max_response_tmp))
                return {error: -39, reason: `${max_response_time} is not a number`};

            if (min_response_tmp>max_response_tmp)
                return {error: -40, reason: `${min_response_time} is greater than ${max_response_time}`};

            if (graphic_plot.length) {
                group_min_response_time_already_exists = false;
                group_max_response_time_already_exists = false;
                for (let graphic of graphic_plot) {
                    if ((graphic.os === os_tmp) && (graphic.browser === browser_tmp) && (graphic.select === (min_response_time as string))) {
                        group_min_response_time_already_exists = true;
                        graphic.data.push({
                            x: timestampToString(data_timestamp - timestamp),
                            y: min_response_tmp
                        });
                    }

                    if ((graphic.os === os_tmp) && (graphic.browser === browser_tmp) && (graphic.select === (max_response_time as string))) {
                        group_max_response_time_already_exists = true;
                        graphic.data.push({
                            x: timestampToString(data_timestamp - timestamp),
                            y: max_response_tmp
                        });
                    }
                }

                if (!group_min_response_time_already_exists) {
                    graphic_plot.push({
                        id: capitalizeLetters(`${os_tmp} ${browser_tmp} ${min_response_time}`),
                        os: os_tmp,
                        browser: browser_tmp,
                        select: min_response_time as string,
                        data: [
                            {
                                //x: data_timestamp,
                                x: timestampToString(data_timestamp - timestamp),
                                y: min_response_tmp
                            }
                        ]
                    });
                }

                if (!group_max_response_time_already_exists) {
                    graphic_plot.push({
                        id: capitalizeLetters(`${os_tmp} ${browser_tmp} ${max_response_time}`),
                        os: os_tmp,
                        browser: browser_tmp,
                        select: max_response_time as string,
                        data: [
                            {
                                x: timestampToString(data_timestamp - timestamp),
                                y: max_response_tmp
                            }
                        ]
                    });
                }

            } else {
                graphic_plot.push({
                    id: capitalizeLetters(`${os_tmp} ${browser_tmp} ${min_response_time}`),
                    os: os_tmp,
                    browser: browser_tmp,
                    select: min_response_time as string,
                    data: [
                        {
                            x: timestampToString(data_timestamp - timestamp),
                            y: min_response_tmp
                        }
                    ]
                });

                graphic_plot.push({
                    id: capitalizeLetters(`${os_tmp} ${browser_tmp} ${max_response_time}`),
                    os: os_tmp,
                    browser: browser_tmp,
                    select: max_response_time as string,
                    data: [
                        {
                            //x: data_timestamp,
                            x: timestampToString(data_timestamp - timestamp),
                            y: max_response_tmp
                        }
                    ]
                });
            }
        } else if (parsed_json.type === 'span') {

            if (timestamp === undefined)
                return {error: -19, reason: `You must begin command with type: 'start'`};
            
            if (!parsed_json.timestamp)
                return {error: -20, reason: `Missing span timestamp at line ${line_number}`};
        
            if (span_timestamp !== undefined)
                return {error: -21, reason: `Redefinition of span timestamp at line ${line_number}`};
            
            if (isNaN(parsed_json.timestamp))
                return {error: -22, reason: `'span' timestamp is NaN. Error at line ${line_number}`};

            span_timestamp = parsed_json.timestamp;

            if (!parsed_json.begin)
                return {error: -23, reason: `Missing 'begin' in type 'span' at line ${line_number}`};
            
            if (isNaN(parsed_json.begin))
                return {error: -24, reason: `'begin' time is NaN. Error at line ${line_number}`}

            begin_timestamp = parsed_json.begin;

            if (!parsed_json.end)
                return {error: -25, reason: `Missing 'end' in type 'span' at line ${line_number}`};

            if (isNaN(parsed_json.end))
                return {error: -26, reason: `'end' timestamp is NaN. Error at line ${line_number}`};

            end_timestamp = parsed_json.end;
    
            if (begin_timestamp >= end_timestamp)
                return {error: -27, reason: `'end' timestamp must be greater than 'begin' timestamp. Error at line ${line_number}`};

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

            stop_timestamp = undefined;

        } else if (parsed_json.type === 'stop') {

            stop_timestamp = parsed_json.timestamp;

            if (!parsed_json.timestamp)
                return {error: -42, reason: `Missing stop timestamp at line ${line_number}`};
        
            if (isNaN(stop_timestamp))
                return {error: -43, reason: `Stop timestamp at line ${line_number} is not a number`};

            if (timestamp !== undefined)
                if (timestamp>stop_timestamp)
                    return {error: -44, reason: `Stop timestamp is lower than start timestamp`};

            timestamp = undefined;
            begin_timestamp = undefined;
            end_timestamp = undefined;
            span_timestamp = undefined;

        } else
            return {error: -41, reason: `Invalid type command at line ${line_number}`};
    }

    if (!graphic_plot.length)
        return null;

    if (graphic_plot.length > MAX_NUMBER_OF_GRAPHICS)
        return {error: -42, reason: `Number of graphics in data = ${graphic_plot.length} exceeds MAX_NUMBER_OF_GRAPHICS = ${MAX_NUMBER_OF_GRAPHICS}`};
    
    return graphic_plot;
}
/**
 * 
 * Convert timestamp to string type HH:MM
 */
function timestampToString(value: number) {
    let date = new Date(value);
    let options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'GMT' 
    };
    return new Intl.DateTimeFormat('default', options).format(date);
}

/**
 *  Captilize letters
 * Take all words and UpperCase all its prefixes given a space or underline 
 *
 */
function capitalizeLetters(text: string): string {
    let textSplitSpaces: any;
    let textSplitUnderline: any;
    let wordsSplitted: string = "";

    if (!text.length)
        return text;

    textSplitSpaces = text.split(' ');

    for (let space in textSplitSpaces) {
        textSplitUnderline = textSplitSpaces[space].split('_');
        for (let underline in textSplitUnderline)
            wordsSplitted += textSplitUnderline[underline][0].toUpperCase() + textSplitUnderline[underline].slice(1) + " ";

    }

    return wordsSplitted;

}
