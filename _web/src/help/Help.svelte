<div
  class="bg-white dark:bg-[#1b1b1f] px-4 py-2"
>
  <div class="prose dark:prose-invert">
    <p>This website is running only from the browser and it uses go templates on WASM to render the templates.</p>
    <h4>Go Template Examples</h4>
    <section>
      <h5>For loop</h5>
      <div>Iterate over a slice and print each element.</div>
      <pre><code
          >{`{{ range $index, $element := .data.items }}
{{- mustToPrettyJson $element }}
{{ end }}`}
</code></pre>
      <br />
      <section>
        <h5>If statement</h5>
        <div>
          Check functions <b>eq</b>, <b>ne</b>, <b>lt</b>, <b>le</b>, <b>gt</b>,
          <b>ge</b> but arguments should be comparable types and result is boolean.
        </div>
        <pre><code>{`result: 10`}</code></pre>
        <br />
        <pre><code
            >{`{{if eq (int .result) 10 -}}
Result is 10
{{- else if eq (int .result) 0 -}}
Result is 0
{{- else -}}
unknown
{{- end}}`}</code
          ></pre>
        <div>Output:</div>
        <pre><code>Result is 10</code></pre>
        <br />
      </section>
      <section>
        <h5>Range with number</h5>
        <div>
          Generates a sequence of integers from 0 up to (but not including) the
          given number.
        </div>
        <pre><code
            >{`{{ range $x := 5 }}
{{- $x }}
{{ end }}`}
</code></pre>
        <br />
      </section>
      <section>
        <h5>With</h5>
        <div>
          Use with to limit the scope of a variable inside of a template.
          If we want to reach outer scope, we can use <b>$.</b> syntax.
        </div>
        <pre><code
            >{`{{ with .name -}}
Item {{ . }} value is {{ $.value }}
{{- end }}`}
</code></pre>
        <br />
      </section>
      <h3>Function References</h3>
      <h4>Helm functions</h4>
      <hr />
      <h4>Sprig Functions</h4>
      <section>
        <h5>abbrev(int, string) string</h5>
        <pre><code
            >{`{{ abbrev 10 "Hello World" }}`}
    Output: Hello W...</code
          ></pre>
      </section>
      <section>
        <h5>abbrevboth(int, int, string) string</h5>
        <pre><code
            >{`{{ abbrevboth 5 10 "1234 5678 9123" }}`}
    Output: ...5678...</code
          ></pre>
      </section>
      <section>
        <h5>add([]interface &#123;&#125;) int64</h5>
        <pre><code
            >{`{{ add 1 2 3 4 5 }}`}
    Output: 15</code
          ></pre>
      </section>
      <section>
        <h5>add1(interface &#123;&#125;) int64</h5>
        <pre><code
            >{`{{ add1 1 }}`}
    Output: 2</code
          ></pre>
      </section>
      <section>
        <h5>add1f(interface &#123;&#125;) float64</h5>
        <pre><code
            >{`{{ add1f 1.1 }}`}
    Output: 2.1</code
          ></pre>
      </section>
      <section>
        <h5>addf([]interface &#123;&#125;) float64</h5>
        <pre><code
            >{`{{ addf 1.1 2.2 3.3 4.4 5.5 }}`}
    Output: 16.5</code
          ></pre>
      </section>
      <section>
        <h5>adler32sum(string) string</h5>
        <pre><code
            >{`{{ adler32sum "Hello World" }}`}
    Output: 403375133</code
          ></pre>
      </section>
      <section>
        <h5>ago(interface &#123;&#125;) string</h5>
        <div>Timestamp to human readable time ago.</div>
        <pre><code
            >{`{{ ago 1687989601 }}`}
    Output: 11s</code
          ></pre>
      </section>
      <section>
        <h5>all([]interface &#123;&#125;) bool</h5>
        <pre><code
            >{`{{ all true true false }}`}
    Output: false</code
          ></pre>
      </section>
      <section>
        <h5>any([]interface &#123;&#125;) bool</h5>
        <pre><code
            >{`{{ any true true false }}`}
    Output: true</code
          ></pre>
      </section>
      <section>
        <h5>
          append(interface &#123;&#125;, interface &#123;&#125;) []interface
          &#123;&#125;
        </h5>
        <div>First argument must be a slice.</div>
        <pre><code
            >{`{{ append . "add" }}`}
    Output: [1 add]</code
          ></pre>
      </section>
      <section>
        <h5>atoi(string) int</h5>
        <pre><code
            >{`{{ atoi "123" }}`}
    Output: 123</code
          ></pre>
      </section>
      <section>
        <h5>b32dec(string) string</h5>
        <pre><code
            >{`{{ b32dec "MZXW6YTBOI======" }}`}
    Output: foobar</code
          ></pre>
      </section>
      <section>
        <h5>b32enc(string) string</h5>
        <pre><code
            >{`{{ b32enc "foobar" }}`}
    Output: MZXW6YTBOI======</code
          ></pre>
      </section>
      <section>
        <h5>b64dec(string) string</h5>
        <pre><code
            >{`{{ b64dec "SGVsbG8gV29ybGQ=" }}`}
    Output: Hello World</code
          ></pre>
      </section>
      <section>
        <h5>b64enc(string) string</h5>
        <pre><code
            >{`{{ b64enc "Hello World" }}`}
    Output: SGVsbG8gV29ybGQ=</code
          ></pre>
      </section>
      <section>
        <h5>base(string) string</h5>
        <div>path.Base function.</div>
        <pre><code
            >{`{{ base "/foo/bar/baz.js" }}`}
    Output: baz.js</code
          ></pre>
      </section>
      <section>
        <h5>bcrypt(string) string</h5>
        <div>
          golang.org/x/crypto/bcrypt package's GenerateFromPassword function.
        </div>
        <pre><code
            >{`{{ bcrypt "Hello World" }}`}
    Output: $2a$10$dTu/HetKKYglHR1bs9mBFeGkOFgIMAabTdC0TNPh5ucVJLQLTfVYG</code
          ></pre>
      </section>
      <section>
        <h5>biggest(interface &#123;&#125;, []interface &#123;&#125;) int64</h5>
        <pre><code
            >{`{{ biggest 1 2 3 4 5 }}`}
    Output: 5</code
          ></pre>
      </section>
      <section>
        <h5>buildCustomCert(string, string) (sprig.certificate, error)</h5>
      </section>
      <section>
        <h5>camelcase(string) string</h5>
        <pre><code
            >{`{{ camelcase "hello_world" }}`}
    Output: HelloWorld</code
          ></pre>
      </section>
      <section>
        <h5>cat([]interface &#123;&#125;) string</h5>
        <pre><code
            >{`{{ cat "Hello" "World" }}`}
    Output: Hello World</code
          ></pre>
      </section>
      <section>
        <h5>ceil(interface &#123;&#125;) float64</h5>
        <pre><code
            >{`{{ ceil 1.1 }}`}
    Output: 2</code
          ></pre>
      </section>
      <section>
        <h5>chunk(int, interface &#123;&#125;) [][]interface &#123;&#125;</h5>
        <pre><code
            >{`{{ chunk 2 (list 1 2 3 4 5) }}`}
    Output: [[1 2] [3 4] [5]]</code
          ></pre>
      </section>
      <section>
        <h5>clean(string) string</h5>
        <div>path.Clean function.</div>
        <pre><code
            >{`{{ clean "/foo/bar/.." }}`}
    Output: /foo</code
          ></pre>
      </section>
      <section>
        <h5>coalesce([]interface &#123;&#125;) interface &#123;&#125;</h5>
        <div>Returns the first non-empty value.</div>
        <pre><code
            >{`{{ coalesce "" "Hello World" }}`}
    Output: Hello World</code
          ></pre>
      </section>
      <section>
        <h5>compact(interface &#123;&#125;) []interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>concat([]interface &#123;&#125;) interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>contains(string, string) bool</h5>
        <div>strings.Contains function but arguments are reversed.</div>
        <pre><code
            >{`{{ contains "World" "Hello World" }}`}
    Output: true</code
          ></pre>
      </section>
      <section>
        <h5>date(string, interface &#123;&#125;) string</h5>
        <div>Date can be a time.Time or an int, int32, int64.</div>
        <pre><code
            >{`{{ date "2006-01-02" 1690151142 }}`}
    Output: 2023-07-24</code
          ></pre>
      </section>
      <section>
        <h5>dateInZone(string, interface &#123;&#125;, string) string</h5>
      </section>
      <section>
        <h5>dateModify(string, time.Time) time.Time</h5>
      </section>
      <section>
        <h5>date_in_zone(string, interface &#123;&#125;, string) string</h5>
      </section>
      <section>
        <h5>date_modify(string, time.Time) time.Time</h5>
      </section>
      <section>
        <h5>decryptAES(string, string) (string, error)</h5>
      </section>
      <section>
        <h5>deepCopy(interface &#123;&#125;) interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>deepEqual(interface &#123;&#125;, interface &#123;&#125;) bool</h5>
      </section>
      <section>
        <h5>
          default(interface &#123;&#125;, []interface &#123;&#125;) interface
          &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>derivePassword(uint32, string, string, string, string) string</h5>
      </section>
      <section>
        <h5>
          dict([]interface &#123;&#125;) map[string]interface &#123;&#125;
        </h5>
        <pre><code
            >{`{{ dict "a" 1 "b" 2 }}`}
    Output: map[a:1 b:2]</code
          ></pre>
      </section>
      <section>
        <h5>dig([]interface &#123;&#125;) (interface &#123;&#125;, error)</h5>
      </section>
      <section>
        <h5>dir(string) string</h5>
        <div>path.Dir function.</div>
        <pre><code
            >{`{{ dir "/foo/bar/baz.js" }}`}
    Output: /foo/bar</code
          ></pre>
      </section>
      <section>
        <h5>div(interface &#123;&#125;, interface &#123;&#125;) int64</h5>
      </section>
      <section>
        <h5>divf(interface &#123;&#125;, []interface &#123;&#125;) float64</h5>
      </section>
      <section>
        <h5>duration(interface &#123;&#125;) string</h5>
        <pre><code
            >{`{{ duration "3600" }}`}
    Output: 1h0m0s</code
          ></pre>
      </section>
      <section>
        <h5>durationRound(interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>empty(interface &#123;&#125;) bool</h5>
        <pre><code
            >{`{{ empty "" }}`}
    Output: true</code
          ></pre>
      </section>
      <section>
        <h5>encryptAES(string, string) (string, error)</h5>
      </section>
      <section>
        <h5>env(string) string</h5>
        <pre><code
            >{`{{ env "HOME" }}`}
    Output: /home/rytsh</code
          ></pre>
      </section>
      <section>
        <h5>expandenv(string) string</h5>
        <pre><code
            >{`{{ expandenv "$HOME" }}`}
    {`{{ expandenv "\${USER}" }}`}
    Output:
    /home/rytsh
    rytsh</code
          ></pre>
      </section>
      <section>
        <h5>ext(string) string</h5>
        <div>path.Ext function.</div>
        <pre><code
            >{`{{ ext "/foo/bar/baz.js" }}`}
    Output: .js</code
          ></pre>
      </section>
      <section>
        <h5>fail(string) (string, error)</h5>
        <pre><code
            >{`{{ fail "FAILED PROGRAM" }}`}
    Output: program fail, exit code 1</code
          ></pre>
      </section>
      <section>
        <h5>first(interface &#123;&#125;) interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>float64(interface &#123;&#125;) float64</h5>
      </section>
      <section>
        <h5>floor(interface &#123;&#125;) float64</h5>
      </section>
      <section>
        <h5>fromJson(string) interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>genCA(string, int) (sprig.certificate, error)</h5>
      </section>
      <section>
        <h5>genCAWithKey(string, int, string) (sprig.certificate, error)</h5>
      </section>
      <section>
        <h5>genPrivateKey(string) string</h5>
      </section>
      <section>
        <h5>
          genSelfSignedCert(string, []interface &#123;&#125;, []interface
          &#123;&#125;, int) (sprig.certificate, error)
        </h5>
      </section>
      <section>
        <h5>
          genSelfSignedCertWithKey(string, []interface &#123;&#125;, []interface
          &#123;&#125;, int, string) (sprig.certificate, error)
        </h5>
      </section>
      <section>
        <h5>
          genSignedCert(string, []interface &#123;&#125;, []interface
          &#123;&#125;, int, sprig.certificate) (sprig.certificate, error)
        </h5>
      </section>
      <section>
        <h5>
          genSignedCertWithKey(string, []interface &#123;&#125;, []interface
          &#123;&#125;, int, sprig.certificate, string) (sprig.certificate,
          error)
        </h5>
      </section>
      <section>
        <h5>
          get(map[string]interface &#123;&#125;, string) interface &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>getHostByName(string) string</h5>
      </section>
      <section>
        <h5>has(interface &#123;&#125;, interface &#123;&#125;) bool</h5>
      </section>
      <section>
        <h5>hasKey(map[string]interface &#123;&#125;, string) bool</h5>
      </section>
      <section>
        <h5>hasPrefix(string, string) bool</h5>
      </section>
      <section>
        <h5>hasSuffix(string, string) bool</h5>
      </section>
      <section>
        <h5>hello() string</h5>
      </section>
      <section>
        <h5>htmlDate(interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>htmlDateInZone(interface &#123;&#125;, string) string</h5>
      </section>
      <section>
        <h5>htpasswd(string, string) string</h5>
      </section>
      <section>
        <h5>indent(int, string) string</h5>
      </section>
      <section>
        <h5>initial(interface &#123;&#125;) []interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>initials(string) string</h5>
      </section>
      <section>
        <h5>int(interface &#123;&#125;) int</h5>
      </section>
      <section>
        <h5>int64(interface &#123;&#125;) int64</h5>
      </section>
      <section>
        <h5>isAbs(string) bool</h5>
      </section>
      <section>
        <h5>join(string, interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>kebabcase(string) string</h5>
      </section>
      <section>
        <h5>keys([]map[string]interface &#123;&#125;) []string</h5>
      </section>
      <section>
        <h5>kindIs(string, interface &#123;&#125;) bool</h5>
      </section>
      <section>
        <h5>kindOf(interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>last(interface &#123;&#125;) interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>list([]interface &#123;&#125;) []interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>lower(string) string</h5>
      </section>
      <section>
        <h5>max(interface &#123;&#125;, []interface &#123;&#125;) int64</h5>
      </section>
      <section>
        <h5>maxf(interface &#123;&#125;, []interface &#123;&#125;) float64</h5>
      </section>
      <section>
        <h5>
          merge(map[string]interface &#123;&#125;, []map[string]interface
          &#123;&#125;) interface &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>
          mergeOverwrite(map[string]interface &#123;&#125;,
          []map[string]interface &#123;&#125;) interface &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>min(interface &#123;&#125;, []interface &#123;&#125;) int64</h5>
      </section>
      <section>
        <h5>minf(interface &#123;&#125;, []interface &#123;&#125;) float64</h5>
      </section>
      <section>
        <h5>mod(interface &#123;&#125;, interface &#123;&#125;) int64</h5>
      </section>
      <section>
        <h5>mul(interface &#123;&#125;, []interface &#123;&#125;) int64</h5>
      </section>
      <section>
        <h5>mulf(interface &#123;&#125;, []interface &#123;&#125;) float64</h5>
      </section>
      <section>
        <h5>
          mustAppend(interface &#123;&#125;, interface &#123;&#125;)
          ([]interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>
          mustChunk(int, interface &#123;&#125;) ([][]interface &#123;&#125;,
          error)
        </h5>
      </section>
      <section>
        <h5>
          mustCompact(interface &#123;&#125;) ([]interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>mustDateModify(string, time.Time) (time.Time, error)</h5>
      </section>
      <section>
        <h5>
          mustDeepCopy(interface &#123;&#125;) (interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>
          mustFirst(interface &#123;&#125;) (interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>mustFromJson(string) (interface &#123;&#125;, error)</h5>
      </section>
      <section>
        <h5>
          mustHas(interface &#123;&#125;, interface &#123;&#125;) (bool, error)
        </h5>
      </section>
      <section>
        <h5>
          mustInitial(interface &#123;&#125;) ([]interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>
          mustLast(interface &#123;&#125;) (interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>
          mustMerge(map[string]interface &#123;&#125;, []map[string]interface
          &#123;&#125;) (interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>
          mustMergeOverwrite(map[string]interface &#123;&#125;,
          []map[string]interface &#123;&#125;) (interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>
          mustPrepend(interface &#123;&#125;, interface &#123;&#125;)
          ([]interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>
          mustPush(interface &#123;&#125;, interface &#123;&#125;) ([]interface
          &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>mustRegexFind(string, string) (string, error)</h5>
      </section>
      <section>
        <h5>mustRegexFindAll(string, string, int) ([]string, error)</h5>
      </section>
      <section>
        <h5>mustRegexMatch(string, string) (bool, error)</h5>
      </section>
      <section>
        <h5>mustRegexReplaceAll(string, string, string) (string, error)</h5>
      </section>
      <section>
        <h5>
          mustRegexReplaceAllLiteral(string, string, string) (string, error)
        </h5>
      </section>
      <section>
        <h5>mustRegexSplit(string, string, int) ([]string, error)</h5>
      </section>
      <section>
        <h5>
          mustRest(interface &#123;&#125;) ([]interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>
          mustReverse(interface &#123;&#125;) ([]interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>
          mustSlice(interface &#123;&#125;, []interface &#123;&#125;) (interface
          &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>mustToDate(string, string) (time.Time, error)</h5>
      </section>
      <section>
        <h5>mustToJson(interface &#123;&#125;) (string, error)</h5>
      </section>
      <section>
        <h5>mustToPrettyJson(interface &#123;&#125;) (string, error)</h5>
      </section>
      <section>
        <h5>mustToRawJson(interface &#123;&#125;) (string, error)</h5>
      </section>
      <section>
        <h5>
          mustUniq(interface &#123;&#125;) ([]interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>
          mustWithout(interface &#123;&#125;, []interface &#123;&#125;)
          ([]interface &#123;&#125;, error)
        </h5>
      </section>
      <section>
        <h5>must_date_modify(string, time.Time) (time.Time, error)</h5>
      </section>
      <section>
        <h5>nindent(int, string) string</h5>
      </section>
      <section>
        <h5>nospace(string) string</h5>
      </section>
      <section>
        <h5>nothing([]interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>now() time.Time</h5>
      </section>
      <section>
        <h5>
          omit(map[string]interface &#123;&#125;, []string) map[string]interface
          &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>osBase(string) string</h5>
      </section>
      <section>
        <h5>osClean(string) string</h5>
      </section>
      <section>
        <h5>osDir(string) string</h5>
      </section>
      <section>
        <h5>osExt(string) string</h5>
      </section>
      <section>
        <h5>osIsAbs(string) bool</h5>
      </section>
      <section>
        <h5>
          pick(map[string]interface &#123;&#125;, []string) map[string]interface
          &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>
          pluck(string, []map[string]interface &#123;&#125;) []interface
          &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>plural(string, string, int) string</h5>
      </section>
      <section>
        <h5>
          prepend(interface &#123;&#125;, interface &#123;&#125;) []interface
          &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>
          push(interface &#123;&#125;, interface &#123;&#125;) []interface
          &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>quote([]interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>randAlpha(int) string</h5>
      </section>
      <section>
        <h5>randAlphaNum(int) string</h5>
      </section>
      <section>
        <h5>randAscii(int) string</h5>
      </section>
      <section>
        <h5>randBytes(int) (string, error)</h5>
      </section>
      <section>
        <h5>randInt(int, int) int</h5>
      </section>
      <section>
        <h5>randNumeric(int) string</h5>
      </section>
      <section>
        <h5>regexFind(string, string) string</h5>
      </section>
      <section>
        <h5>regexFindAll(string, string, int) []string</h5>
      </section>
      <section>
        <h5>regexMatch(string, string) bool</h5>
      </section>
      <section>
        <h5>regexQuoteMeta(string) string</h5>
      </section>
      <section>
        <h5>regexReplaceAll(string, string, string) string</h5>
      </section>
      <section>
        <h5>regexReplaceAllLiteral(string, string, string) string</h5>
      </section>
      <section>
        <h5>regexSplit(string, string, int) []string</h5>
      </section>
      <section>
        <h5>repeat(int, string) string</h5>
      </section>
      <section>
        <h5>replace(string, string, string) string</h5>
      </section>
      <section>
        <h5>rest(interface &#123;&#125;) []interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>reverse(interface &#123;&#125;) []interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>round(interface &#123;&#125;, int, []float64) float64</h5>
      </section>
      <section>
        <h5>semver(string) (*semver.Version, error)</h5>
      </section>
      <section>
        <h5>semverCompare(string, string) (bool, error)</h5>
      </section>
      <section>
        <h5>seq([]int) string</h5>
      </section>
      <section>
        <h5>
          set(map[string]interface &#123;&#125;, string, interface &#123;&#125;)
          map[string]interface &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>sha1sum(string) string</h5>
      </section>
      <section>
        <h5>sha256sum(string) string</h5>
      </section>
      <section>
        <h5>shuffle(string) string</h5>
      </section>
      <section>
        <h5>
          slice(interface &#123;&#125;, []interface &#123;&#125;) interface
          &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>snakecase(string) string</h5>
      </section>
      <section>
        <h5>sortAlpha(interface &#123;&#125;) []string</h5>
      </section>
      <section>
        <h5>split(string, string) map[string]string</h5>
      </section>
      <section>
        <h5>splitList(string, string) []string</h5>
      </section>
      <section>
        <h5>splitn(string, int, string) map[string]string</h5>
      </section>
      <section>
        <h5>squote([]interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>sub(interface &#123;&#125;, interface &#123;&#125;) int64</h5>
      </section>
      <section>
        <h5>subf(interface &#123;&#125;, []interface &#123;&#125;) float64</h5>
      </section>
      <section>
        <h5>substr(int, int, string) string</h5>
      </section>
      <section>
        <h5>swapcase(string) string</h5>
      </section>
      <section>
        <h5>
          ternary(interface &#123;&#125;, interface &#123;&#125;, bool)
          interface &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>title(string) string</h5>
      </section>
      <section>
        <h5>toDate(string, string) time.Time</h5>
      </section>
      <section>
        <h5>toDecimal(interface &#123;&#125;) int64</h5>
      </section>
      <section>
        <h5>toJson(interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>toPrettyJson(interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>toRawJson(interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>toString(interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>toStrings(interface &#123;&#125;) []string</h5>
      </section>
      <section>
        <h5>trim(string) string</h5>
      </section>
      <section>
        <h5>trimAll(string, string) string</h5>
      </section>
      <section>
        <h5>trimPrefix(string, string) string</h5>
      </section>
      <section>
        <h5>trimSuffix(string, string) string</h5>
      </section>
      <section>
        <h5>trimall(string, string) string</h5>
      </section>
      <section>
        <h5>trunc(int, string) string</h5>
      </section>
      <section>
        <h5>tuple([]interface &#123;&#125;) []interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>typeIs(string, interface &#123;&#125;) bool</h5>
      </section>
      <section>
        <h5>typeIsLike(string, interface &#123;&#125;) bool</h5>
      </section>
      <section>
        <h5>typeOf(interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>uniq(interface &#123;&#125;) []interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>unixEpoch(time.Time) string</h5>
      </section>
      <section>
        <h5>
          unset(map[string]interface &#123;&#125;, string) map[string]interface
          &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>until(int) []int</h5>
      </section>
      <section>
        <h5>untilStep(int, int, int) []int</h5>
      </section>
      <section>
        <h5>untitle(string) string</h5>
      </section>
      <section>
        <h5>upper(string) string</h5>
      </section>
      <section>
        <h5>urlJoin(map[string]interface &#123;&#125;) string</h5>
      </section>
      <section>
        <h5>urlParse(string) map[string]interface &#123;&#125;</h5>
      </section>
      <section>
        <h5>uuidv4() string</h5>
      </section>
      <section>
        <h5>
          values(map[string]interface &#123;&#125;) []interface &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>
          without(interface &#123;&#125;, []interface &#123;&#125;) []interface
          &#123;&#125;
        </h5>
      </section>
      <section>
        <h5>wrap(int, string) string</h5>
      </section>
      <section>
        <h5>wrapWith(int, string, string) string</h5>
      </section>
    </section>
  </div>
</div>

<style lang="scss">
  .prose {
    font-size: 16px;
    line-height: 1.6;
    background: none;
    code {
      background: #1f1f23;
      color: #fff;
      padding: 0.2em 0.4em;
      border-radius: 6px;
      font-size: 90%;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo,
        monospace;
    }
    pre {
      background: #1f1f23;
      color: #fff;
      padding: 1em;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 90%;
      code {
        background: none;
        padding: 0;
        border-radius: 0;
        color: inherit;
        font-size: inherit;
      }
    }
    h3,
    h4,
    h5 {
      font-weight: 600;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      color: #1a1a1a;
    }
    h3 {
      font-size: 1.25em;
    }
    h4 {
      font-size: 1.1em;
    }
    h5 {
      font-size: 1em;
    }
    section {
      margin-bottom: 1.5em;
      border-bottom: 1px solid #eaecef;
      padding-bottom: 1em;
    }
  }

  :global(.dark) .prose {
    color: #fff;
    h3,
    h4,
    h5 {
      color: #fff;
    }
    section {
      border-bottom: 1px solid #30363d;
    }
  }
</style>
