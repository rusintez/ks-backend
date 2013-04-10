SRC = $(wildcard components/*/*.js, lib/*/*.js)
HTML = $(wildcard components/*/*.html, lib/*/*.html)
TEMPLATES = $(HTML:.html=.js)

build: components $(SRC) $(TEMPLATES)
	@component build -o build

components: component.json
	@component install

%.js: %.html
	@component convert $<

clean:
	rm -fr build components $(TEMPLATES)

.PHONY: clean