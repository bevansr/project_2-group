install.packages("ggmap")
library("ggmap")
lonlat_sample <- c(-87.6172043949,41.808529769)
res <- revgeocode(lonlat_sample,  output = c("address", "all"))
res$postal_code
res$neighborhood
